import React from "react";
import { TouchableOpacity, Pressable, StyleSheet } from "react-native";

import { View, Text } from "ui-kit";

interface Props {
  transactions: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const eventBus = (window as any).eventBus;

export const BackButton = () => {
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => window.history.back()}
    >
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
  );
};

export const TransactionHistory = ({
  transactions,
  selectedId,
  onSelect,
}: Props) => {
  if (transactions.length === 0) {
    return <Text>No transactions available.</Text>;
  }

  const handleRowClick = (id: string) => {
    onSelect(id);
    eventBus.emit("navigate", `/transactions`);
  };

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Txn Id</Text>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Amount</Text>
        <Text style={styles.headerCell}>Date</Text>
      </View>
      {transactions.map((txn) => (
        <Pressable
          key={txn.id}
          style={[styles.row, txn.id === selectedId && styles.selectedRow]}
          onPress={() => handleRowClick(txn.id)}
        >
          <Text style={styles.cell}>{txn.id}</Text>
          <Text style={styles.cell}>{txn.type}</Text>
          <Text style={styles.cell}>${txn.amount}</Text>
          <Text style={styles.cell}>
            {new Date(txn.date).toLocaleDateString()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: { flex: 1, marginVertical: 10 },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedRow: { backgroundColor: "#eef6ff" },
  headerCell: { flex: 1, fontWeight: "bold", textAlign: "left" },
  cell: { flex: 1, textAlign: "left" },
  backBtn: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  backText: { fontSize: 14 },
});
