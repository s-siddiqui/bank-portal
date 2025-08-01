import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";

import { View, Text } from "ui-kit";

import { GET_CUSTOMER_ACCOUNT } from "../graphql/queries";

export const AccountOverview = () => {
  const { data, loading, error } = useQuery(GET_CUSTOMER_ACCOUNT);

  if (loading) return <Text>Loading Account...</Text>;
  if (error) return <Text>Error loading account data</Text>;

  const customer = data.customers[0];
  const account = customer.accounts[0];
  const lastTransactions = account.transactions.slice(0, 3);

  const handleTransactionClick = (id: string) => {
    // Emit global event for MF2
    (window as any).__lastSelectedTransactionId = id;
    (window as any).eventBus.emit("transactionSelected", id);
    (window as any).eventBus.emit("navigate", `/transactions`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Overview</Text>
      <Text>Name: {customer.name}</Text>
      <Text>Email: {customer.email}</Text>
      <Text>Account Number: {account.accountNumber}</Text>
      <Text>
        Balance: {account.balance} {account.currency}
      </Text>

      <Text style={styles.subTitle}>Last 3 Transactions:</Text>
      {lastTransactions.length === 0 ? (
        <Text>No transactions available</Text>
      ) : (
        lastTransactions.map((txn: any) => (
          <Pressable
            key={txn.id}
            style={styles.transactionItem}
            onPress={() => handleTransactionClick(txn.id)}
          >
            <Text>{txn.description}</Text>
            <Text>${txn.amount}</Text>
          </Pressable>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
  transactionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
