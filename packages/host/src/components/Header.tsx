import React from "react";
import { StyleSheet } from "react-native";

import { Button, View, Text } from "ui-kit";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🏦 Bank Portal</Text>
      <Button label="Logout" onPress={() => alert("Logout clicked")} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#1a237e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
