import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { AppRouter } from "./AppRouter";

import { client } from "./graphql/client";

console.log(process.env.NODE_ENV, process.env, "process.env.NODE_ENV");

const App = () => (
  <BrowserRouter
    basename={process.env.NODE_ENV === "production" ? "/bank-portal/host" : "/"}
  >
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
