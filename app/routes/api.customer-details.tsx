import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  // Get the customer ID from the request body
  const { customerId } = await request.json();

  if (!customerId) {
    return json({ error: "Customer ID is required" }, { status: 400 });
  }

  try {
    const response = await admin.graphql(
      `#graphql
        query GetCustomer($id: ID!) {
          customer(id: $id) {
            id
            firstName
            lastName
            defaultEmailAddress {
              emailAddress
              marketingOptInLevel
              marketingState
            }
            defaultPhoneNumber {
              phoneNumber
              }
            tags
            defaultAddress {
              address1
              city
              country
            }
            amountSpent {
              amount
              currencyCode
            }
            orders {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      `,
      {
        variables: {
          id: customerId,
        },
      }
    );

    const responseJson = await response.json();
    return json(responseJson);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return json({ error: "Failed to fetch customer details" }, { status: 500 });
  }
};
