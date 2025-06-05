export const GET_CUSTOMER_DETAILS = `
  query GetCustomerDetails($customerId: ID!) {
    customer(id: $customerId) {
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
      orders(first: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
