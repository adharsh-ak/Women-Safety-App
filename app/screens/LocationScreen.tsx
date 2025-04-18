import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Live Location Tracking</Text>
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
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You are here" />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Fetching Location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  headerText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  map: { width: "90%", height: "50%", borderRadius: 10 },
  loadingText: { fontSize: 16, color: "gray" },
});
