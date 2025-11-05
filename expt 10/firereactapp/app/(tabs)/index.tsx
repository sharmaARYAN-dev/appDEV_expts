import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export default function IndexScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // CREATE
  const addUser = async () => {
    if (name && email && age) {
      await addDoc(collection(db, "users"), {
        name,
        email,
        age: parseInt(age),
      });
      console.log("User Added");
      setName("");
      setEmail("");
      setAge("");
      fetchUsers();
    }
  };

  // READ
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList: User[] = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<User, "id">),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // UPDATE
  const updateUser = async () => {
    if (selectedId) {
      const userRef = doc(db, "users", selectedId);
      await updateDoc(userRef, { age: parseInt(age) });
      console.log("User Updated");
      setSelectedId(null);
      setName("");
      setEmail("");
      setAge("");
      fetchUsers();
    }
  };

  // DELETE
  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, "users", id));
    console.log("User Deleted");
    fetchUsers();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={selectedId ? "Update User" : "Add User"}
        onPress={selectedId ? updateUser : addUser}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: User }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>Age: {item.age}</Text>
            <Button
              title="Edit"
              onPress={() => {
                setSelectedId(item.id);
                setName(item.name);
                setEmail(item.email);
                setAge(item.age.toString());
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteUser(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  card: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
});
