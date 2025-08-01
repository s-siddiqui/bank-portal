import React from "react";
import { StyleSheet, Platform } from "react-native";

import { View, Text, Button } from "ui-kit";

interface Props {
  transaction: any;
}

export const TransactionDetail = ({ transaction }: Props) => {
  if (!transaction) {
    return (
      <Text style={styles.empty}>Select a transaction to see details.</Text>
    );
  }

  const handleDownloadCSV = () => {
    const csv = `ID,Type,Amount,Description,Date\n${transaction.id},${transaction.type},${transaction.amount},${transaction.description},${transaction.date}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transaction-${transaction.id}.csv`;
    link.click();
  };

  const handleShare = () => {
    alert(`Sharing transaction: ${transaction.description}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>
      <Text>Transaction Id: {transaction.id}</Text>
      <Text>Type: {transaction.type}</Text>
      <Text>Amount: ${transaction.amount}</Text>
      <Text>Description: {transaction.description}</Text>
      <Text>Date: {new Date(transaction.date).toLocaleString()}</Text>

      {Platform.OS === "web" ? (
        <Button
          style={{ width: "120px" }}
          title="Download CSV"
          label="Download CSV"
          onPress={handleDownloadCSV}
        />
      ) : (
        <Button title="Share" onPress={handleShare} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  empty: { fontSize: 14, marginVertical: 10 },
});
