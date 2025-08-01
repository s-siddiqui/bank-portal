import { gql } from "apollo-server";

export const typeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
    accounts: [Account!]!
  }

  type Account {
    id: ID!
    customerId: ID!
    accountNumber: String!
    balance: Float!
    currency: String!
    transactions: [Transaction!]!
  }

  type Transaction {
    id: ID!
    accountId: ID!
    type: String!
    amount: Float!
    description: String
    date: String!
  }

  type Query {
    customers: [Customer!]!
    accounts: [Account!]!
    transactions: [Transaction!]!
  }
`;
