import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Camera } from "expo-camera";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync();
      setPhoto(photoData.uri);
      Alert.alert("Photo Captured", "The image has been saved.");
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting Camera Permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Camera ref={(ref) => setCamera(ref)} style={styles.camera} />
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  captureButton: { position: "absolute", bottom: 30, backgroundColor: "red", padding: 15, borderRadius: 10 },
  retakeButton: { marginTop: 20, backgroundColor: "blue", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 18 },
  preview: { width: "90%", height: "70%", marginTop: 20 },
});
