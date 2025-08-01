import React, { Suspense, lazy } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";

import { View, Text, Shimmer } from "ui-kit";
import { Sidebar } from "../components/Sidebar";
import { SummaryTile } from "../components/SummaryTile";
import { NotificationCard } from "../components/NotificationCard";
import { AccountOverviewShimmer } from "./AccountOverviewShimmer";

import { GET_CUSTOMER_ACCOUNT } from "../graphql/queries";

const RemoteAccountApp = lazy(() => import("mf_account/App"));

export default function AccountOverviewPage() {
  const { data, loading, error } = useQuery(GET_CUSTOMER_ACCOUNT);

  if (loading) return <AccountOverviewShimmer />;
  if (error) return <Text>Error loading account data</Text>;

  const customer = data.customers[0];
  const account = customer.accounts[0];

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Sidebar />
        <ScrollView style={styles.content}>
          <Text
            style={styles.heading}
          >{`Welcome back, ${customer.name}👋`}</Text>
          <View style={styles.summaryRow}>
            <SummaryTile title="Total Balance" value={account.balance} />
            <SummaryTile title="Accounts" value="3" />
            <SummaryTile title="Transactions (30d)" value="124" />
          </View>

          <Text style={styles.sectionTitle}>Your Accounts</Text>
          <View style={styles.mfContainer}>
            <Suspense fallback={<AccountOverviewShimmer />}>
              <RemoteAccountApp />
            </Suspense>
          </View>

          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          <NotificationCard
            message="Your statement for December is now available."
            date="2 days ago"
          />
          <NotificationCard
            message="A deposit of $1,000 has been credited to your account."
            date="1 week ago"
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8ebf0" },
  main: { flexDirection: "row", flex: 1 },
  content: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  summaryRow: { flexDirection: "row", marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 16 },
  mfContainer: { backgroundColor: "#fff", borderRadius: 8, padding: 12 },
  shimmerContainer: {
    gap: 12,
    padding: 12,
  },
  shimmerBox: {
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
});
