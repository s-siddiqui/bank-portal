import React from "react";
import { StyleSheet } from "react-native";

import { Text, Card } from "ui-kit";

interface Props {
  message: string;
  date: string;
}

export const NotificationCard = ({ message, date }: Props) => (
  <Card style={styles.card}>
    <Text style={styles.message}>{message}</Text>
    <Text style={styles.date}>{date}</Text>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
  },
  message: {
    fontSize: 16,
    color: "#212121",
  },
  date: {
    fontSize: 12,
    color: "#9e9e9e",
    marginTop: 4,
  },
});
