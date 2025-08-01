import React from "react";
import { ApolloProvider } from "@apollo/client";

import { View, Text } from "ui-kit";
import { AccountOverview } from "./components/AccountOverview";

import { client } from "./graphql/client";

const App = () => (
  <ApolloProvider client={client}>
    <View style={{ padding: 20 }}>
      <AccountOverview />
    </View>
  </ApolloProvider>
);

export default App;
