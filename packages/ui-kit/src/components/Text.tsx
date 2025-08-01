import React from "react";
import { Text as RNText, TextProps } from "react-native";

export const Text: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <RNText style={[{ fontSize: 16, color: "#333" }, style]} {...props}>
      {children}
    </RNText>
  );
};
