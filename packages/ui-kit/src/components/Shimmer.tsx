// Shimmer.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const Shimmer = ({ style }: { style: object }) => {
  const translateX = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 300,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    position: "relative",
  },
  shimmerOverlay: {
    width: 100,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "absolute",
  },
});
