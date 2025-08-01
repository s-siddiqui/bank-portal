import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "ui-kit";

export const Sidebar = () => (
  <View style={styles.sidebar}>
    <Text style={styles.link}>🏠 Dashboard</Text>
    <Text style={styles.link}>💳 Accounts</Text>
    <Text style={styles.link}>📊 Transactions</Text>
    <Text style={styles.link}>⚙️ Settings</Text>
  </View>
);

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: "#f4f6f8",
    padding: 20,
    borderRightColor: "#ccc",
    borderRightWidth: 1,
  },
  link: {
    marginBottom: 20,
    fontSize: 16,
    color: "#1a237e",
    fontWeight: "600",
  },
});
