import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query {
    transactions {
      id
      accountId
      type
      amount
      description
      date
    }
  }
`;

export const GET_TRANSACTION_BY_ID = gql`
  query ($id: ID!) {
    transactions {
      id
      accountId
      type
      amount
      description
      date
    }
  }
`;
