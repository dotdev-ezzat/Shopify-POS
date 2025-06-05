import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  // Get the shop ID and access token from headers
  const shopId = request.headers.get("X-Shopify-Shop-Id");
  const accessToken = request.headers.get("X-Shopify-Access-Token");

  if (!shopId || !accessToken) {
    return json({ errors: [{ message: "Missing required headers" }] }, { status: 400 });
  }

  try {
    // Get the GraphQL query and variables from the request body
    const { query, variables } = await request.json();

    // Make the GraphQL request using the admin client
    const response = await admin.graphql(query, {
      variables: variables,
    });

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("GraphQL request error:", error);
    return json(
      { errors: [{ message: "Failed to execute GraphQL query" }] },
      { status: 500 }
    );
  }
};
