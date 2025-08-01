import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});

console.log(process.env.GRAPHQL_URL, "GRAPHQL_URL");
