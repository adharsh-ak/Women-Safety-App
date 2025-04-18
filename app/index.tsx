import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Accelerometer } from "expo-sensors";

export default function Index() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const emergencyContacts = [
    { name: "Emergency Contact 1", phone: "1234567890" },
    { name: "Emergency Contact 2", phone: "0987654321" },
  ];

  useEffect(() => {
    let locationSubscription;
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use this feature.");
        return;
      }
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 5 },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );
    };
    startLocationUpdates();

    return () => {
      if (locationSubscription) locationSubscription.remove();
    };
  }, []);

  // Shake gesture detection for SOS
  useEffect(() => {
    const subscribe = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 2.5) { 
        triggerEmergencyProtocol();
      }
    });
    setSubscription(subscribe);

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const triggerEmergencyProtocol = async () => {
    setIsSOSActive(true);
    emergencyContacts.forEach(contact => {
      const message = `EMERGENCY: I need help! My location: https://maps.google.com/?q=${location?.latitude},${location?.longitude}`;
      const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
      Linking.openURL(smsUrl);
    });
    try {
      const phoneUrl = `tel:${emergencyContacts[0].phone}`;
      await Linking.openURL(phoneUrl);
    } catch (error) {
      console.error("Failed to initiate emergency call:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Safe Her</Text>
      </View>

      {/* Live Location Tracking */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Your Location" />
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Fetching Location...</Text>
        )}
      </View>

      {/* SOS Button */}
      <TouchableOpacity 
        style={[styles.sosButton, isSOSActive && styles.sosActive]}
        onLongPress={triggerEmergencyProtocol}
      >
        <Text style={styles.sosButtonText}>
          {isSOSActive ? 'SOS ACTIVATED' : 'Hold for SOS'}
        </Text>
        <Text style={styles.sosSubtext}>
          Shake device or Hold for emergency
        </Text>
      </TouchableOpacity>

      {/* Additional Features */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureBox} onPress={() => router.push("/screens/CameraScreen")}>
          <Text style={styles.featureTitle}>Open Camera</Text>
          <Text style={styles.featureDesc}>Capture images or record videos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureBox} onPress={() => Alert.alert("Feature Coming Soon!")}>
          <Text style={styles.featureTitle}>Safe Zones</Text>
          <Text style={styles.featureDesc}>Set up location-based alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureBox} onPress={() => Alert.alert("Feature Coming Soon!")}>
          <Text style={styles.featureTitle}>Trusted Contacts</Text>
          <Text style={styles.featureDesc}>Manage emergency contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  header: { padding: 20, backgroundColor: "#ff4757", alignItems: "center", width: "100%" },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  mapContainer: { width: "90%", height: 250, marginTop: 10 },
  map: { flex: 1, borderRadius: 10 },
  loadingText: { fontSize: 16, color: "gray", marginTop: 10 },
  sosButton: {
    backgroundColor: "#ff6b81",
    padding: 25,
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginTop: 20,
  },
  sosActive: { backgroundColor: "#ff0000" },
  sosButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  sosSubtext: { color: "#fff", fontSize: 12, marginTop: 10, textAlign: "center" },
  featuresContainer: { flexDirection: "row", flexWrap: "wrap", padding: 10, justifyContent: "space-around", marginTop: 20 },
  featureBox: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    width: "45%",
    marginBottom: 15,
    elevation: 2,
  },
  featureTitle: { fontSize: 16, fontWeight: "bold", color: "#ff4757" },
  featureDesc: { fontSize: 12, color: "#666", marginTop: 5 },
});

