import React, { useEffect, useState } from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import { StyleSheet } from "react-native";

import { View, Text } from "ui-kit";
import {
  BackButton,
  TransactionHistory,
  TransactionDetail,
  TransactionDetailShimmer,
  TransactionHistoryShimmer,
} from "./components";

import { client } from "./graphql/client";
import { GET_TRANSACTIONS } from "./graphql/queries";

const TransactionsWrapper = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // ✅ If an event already happened, retrieve the stored ID
    const initialSelectedId = (window as any).__lastSelectedTransactionId;
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
    const handler = (id: string) => {
      console.log("🎯 Received transactionSelected:", id);
      (window as any).__lastSelectedTransactionId = id; // persist globally
      setSelectedId(id);
    };

    (window as any).eventBus.on("transactionSelected", handler);

    return () => {
      (window as any).eventBus.off("transactionSelected", handler);
    };
  }, []);

  if (error)
    return (
      <View>
        <Text>Error loading transactions</Text>
      </View>
    );

  const transactions = data?.transactions || [];
  const selectedTxn =
    transactions?.find((t: any) => t.id === selectedId) || null;

  console.log(transactions, selectedTxn, selectedId, "txn");

  return (
    <View style={styles.container}>
      <BackButton />
      {loading ? (
        <TransactionHistoryShimmer />
      ) : (
        <TransactionHistory
          transactions={transactions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      )}
      {loading ? (
        <TransactionDetailShimmer />
      ) : (
        <TransactionDetail transaction={selectedTxn} />
      )}
    </View>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <TransactionsWrapper />
  </ApolloProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
