import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { TouchableOpacity, StyleSheet } from "react-native";

import { View, Text, Button } from "ui-kit";

import AccountOverviewPage from "./pages/AccountOverviewPage";

import { eventBus } from "./eventBus";

const RemoteTransactionsApp = lazy(() => import("mf_transactions/App"));

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.navBar}>
      <Text style={styles.brand}>🏦 Bank Portal</Text>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => navigate("/accounts")}>
          <Text style={styles.link}>Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("/transactions")}>
          <Text style={styles.link}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Logout clicked")}>
          <Text style={styles.link}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    eventBus.on("navigate", (path) => {
      navigate(path);
    });
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/accounts" />} />
          <Route path="/accounts" element={<AccountOverviewPage />} />
          <Route path="/transactions" element={<RemoteTransactionsApp />} />
        </Routes>
      </Suspense>
    </>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#1a237e",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  navLinks: { flexDirection: "row", gap: 20 },
  link: { color: "#fff", fontSize: 16 },
});
