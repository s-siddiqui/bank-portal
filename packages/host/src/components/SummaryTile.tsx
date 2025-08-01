import React from "react";
import { StyleSheet } from "react-native";

import { Text, Card } from "ui-kit";

interface Props {
  title: string;
  value: string;
}

export const SummaryTile = ({ title, value }: Props) => (
  <Card style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a237e",
  },
});
