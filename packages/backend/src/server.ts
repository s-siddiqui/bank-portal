import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ["https://s-siddiqui.github.io"],
    credentials: true,
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Mock GraphQL server ready at ${url}`);
});
