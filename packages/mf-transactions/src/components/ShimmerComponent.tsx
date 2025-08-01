import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Shimmer } from "ui-kit";

export const TransactionHistoryShimmer = () => {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        {[...Array(4)].map((_, i) => (
          <Shimmer key={i} style={styles.headerCellShimmer} />
        ))}
      </View>
      {[...Array(5)].map((_, idx) => (
        <View key={idx} style={styles.row}>
          {[...Array(4)].map((_, i) => (
            <Shimmer key={i} style={styles.cellShimmer} />
          ))}
        </View>
      ))}
    </View>
  );
};

export const TransactionDetailShimmer = () => {
  return (
    <View style={styles.detailContainer}>
      <Shimmer style={styles.detailHeader} />
      {[...Array(5)].map((_, i) => (
        <Shimmer key={i} style={styles.detailLine} />
      ))}
      <Shimmer style={styles.buttonShimmer} />
    </View>
  );
};

const styles = StyleSheet.create({
  table: { flex: 1, marginVertical: 10 },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 6,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 8,
  },
  headerCellShimmer: {
    flex: 1,
    height: 14,
    borderRadius: 4,
  },
  cellShimmer: {
    flex: 1,
    height: 12,
    borderRadius: 4,
  },
  detailContainer: {
    padding: 10,
    gap: 10,
    marginTop: 10,
  },
  detailHeader: {
    width: 200,
    height: 20,
    borderRadius: 6,
  },
  detailLine: {
    width: "90%",
    height: 14,
    borderRadius: 4,
  },
  buttonShimmer: {
    width: 120,
    height: 36,
    borderRadius: 6,
    marginTop: 12,
  },
});
