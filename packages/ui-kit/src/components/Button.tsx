import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ label, onPress, style }) => (
  <Pressable onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
});
