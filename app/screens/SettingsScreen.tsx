import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";

export default function SettingsScreen() {
  const [shakeGestureEnabled, setShakeGestureEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(true);

  const toggleShakeGesture = () => {
    setShakeGestureEnabled((prev) => !prev);
    Alert.alert("Shake Gesture", `Shake Gesture is now ${!shakeGestureEnabled ? "Enabled" : "Disabled"}`);
  };

  const toggleLocationTracking = () => {
    setLocationTrackingEnabled((prev) => !prev);
    Alert.alert("Location Tracking", `Location Tracking is now ${!locationTrackingEnabled ? "Enabled" : "Disabled"}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>

      {/* Toggle Shake Gesture */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Shake Gesture for SOS</Text>
        <Switch value={shakeGestureEnabled} onValueChange={toggleShakeGesture} />
      </View>

      {/* Toggle Location Tracking */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Live Location Tracking</Text>
        <Switch value={locationTrackingEnabled} onValueChange={toggleLocationTracking} />
      </View>
      
      {/* More Settings Can Be Added Here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerText: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  settingLabel: { fontSize: 16, fontWeight: "500" },
});
