import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addContact = () => {
    if (name && phone) {
      setContacts([...contacts, { name, phone }]);
      setName("");
      setPhone("");
    } else {
      Alert.alert("Error", "Please enter both name and phone number.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Trusted Contacts</Text>
      
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="numeric" />

      <TouchableOpacity style={styles.addButton} onPress={addContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text>{item.name} - {item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerText: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  addButton: { backgroundColor: "green", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  contactItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});
