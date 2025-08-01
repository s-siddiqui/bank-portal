import { customers, accounts, transactions } from "./db";

export const resolvers = {
  Query: {
    customers: () => customers || [],
    accounts: () => accounts || [],
    transactions: () => transactions || [],
  },
  Customer: {
    accounts: (parent: any) =>
      accounts.filter((acc) => acc.customerId === parent.id),
  },
  Account: {
    transactions: (parent: any) =>
      transactions.filter((txn) => txn.accountId === parent.id),
  },
};
