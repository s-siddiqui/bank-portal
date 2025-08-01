import React from "react";
import { StyleSheet } from "react-native";
import { View, Shimmer } from "@bank-portal/ui-kit";

export const AccountOverviewShimmer = () => {
  return (
    <View style={styles.container}>
      <Shimmer style={styles.title} />

      <View style={styles.cardRow}>
        {[...Array(2)].map((_, i) => (
          <Shimmer key={i} style={styles.card} />
        ))}
      </View>

      <View style={styles.section}>
        <Shimmer style={styles.sectionTitle} />
        {[...Array(3)].map((_, i) => (
          <Shimmer key={i} style={styles.item} />
        ))}
      </View>

      <View style={styles.section}>
        <Shimmer style={styles.sectionTitle} />
        {[...Array(2)].map((_, i) => (
          <Shimmer key={i} style={styles.item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  title: {
    width: "60%",
    height: 28,
    borderRadius: 6,
  },
  cardRow: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    height: 100,
    borderRadius: 12,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    width: "50%",
    height: 20,
    borderRadius: 6,
  },
  item: {
    width: "100%",
    height: 16,
    borderRadius: 4,
  },
});
