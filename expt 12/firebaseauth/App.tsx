import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import EmailAuth from "./screens/EmailAuth";
import PhoneAuth from "./screens/PhoneAuth";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Firebase Authentication</Text>

      <View style={styles.card}>
        <EmailAuth />
      </View>

      <View style={styles.card}>
        <PhoneAuth />
      </View>

      <Text style={styles.footer}>© 2025 Expt 12 — Firebase Auth</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    color: "#111",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  footer: {
    color: "#888",
    fontSize: 12,
    marginTop: 20,
  },
});
