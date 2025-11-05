import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

type User = { id: number; name: string; email: string };

// ✅ use openDatabaseSync for new Expo SDKs
const db = SQLite.openDatabaseSync("mydb.db");

export default function HomeScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  // Create table once
  useEffect(() => {
    try {
      db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT
        );
      `);
      fetchUsers();
    } catch (error) {
      console.error("DB init error:", error);
    }
  }, []);

  // Read all users
  const fetchUsers = async () => {
    try {
      const result = await db.getAllAsync<User>("SELECT * FROM users;");
      setUsers(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Add user
  const addUser = async () => {
    if (!name || !email) {
      Alert.alert("Please enter both fields");
      return;
    }
    try {
      await db.runAsync("INSERT INTO users (name, email) VALUES (?, ?);", [name, email]);
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Insert error:", error);
    }
  };

  // Delete user
  const deleteUser = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM users WHERE id=?;", [id]);
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite CRUD (Expo + TypeScript)</Text>

      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Add User" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>
              {item.id}. {item.name} - {item.email}
            </Text>
            <Button title="Delete" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
});
