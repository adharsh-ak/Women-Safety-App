import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, Linking } from "react-native";

export default function SOSButton({ location, emergencyContacts }) {
  const [isSOSActive, setIsSOSActive] = useState(false);

  const triggerEmergencyProtocol = async () => {
    setIsSOSActive(true);
    emergencyContacts.forEach(contact => {
      const message = `EMERGENCY: I need help! Location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      Linking.openURL(`sms:${contact.phone}?body=${encodeURIComponent(message)}`);
    });
  };

  return (
    <TouchableOpacity style={[styles.sosButton, isSOSActive && styles.sosActive]} onLongPress={triggerEmergencyProtocol}>
      <Text style={styles.sosButtonText}>{isSOSActive ? "SOS ACTIVATED" : "Hold for SOS"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sosButton: { backgroundColor: "red", padding: 20, borderRadius: 10, marginTop: 20 },
  sosActive: { backgroundColor: "#ff0000" },
  sosButtonText: { color: "white", fontWeight: "bold" },
});
