import React from "react";
import { View as RNView, ViewProps } from "react-native";

export const View: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <RNView style={[{ padding: 10 }, style]} {...props}>
      {children}
    </RNView>
  );
};
