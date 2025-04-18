import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LocationDisplay({ location }) {
  return (
    <View style={styles.mapContainer}>
      {location ? (
        <MapView style={styles.map} initialRegion={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Your Location" />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Fetching Location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { width: "90%", height: 250, marginTop: 10 },
  map: { flex: 1, borderRadius: 10 },
  loadingText: { fontSize: 16, color: "gray", marginTop: 10 },
});
