import { gql } from "@apollo/client";

export const GET_CUSTOMER_ACCOUNT = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      accounts {
        id
        accountNumber
        balance
        currency
        transactions {
          id
          type
          amount
          description
          date
        }
      }
    }
  }
`;
