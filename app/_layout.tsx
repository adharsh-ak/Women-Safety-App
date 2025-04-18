import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Home Screen (Main Page) */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Safe-Her",
          headerStyle: { backgroundColor: "#ff4757" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
        }} 
      />

      {/* Camera Screen */}
      <Stack.Screen 
        name="screens/CameraScreen" 
        options={{ 
          title: "Camera",
          headerStyle: { backgroundColor: "#ff4757" },
          headerTintColor: "#fff",
        }} 
      />

      {/* Location Screen (Future Enhancement) */}
      <Stack.Screen 
        name="screens/LocationScreen" 
        options={{ 
          title: "Live Location",
          headerStyle: { backgroundColor: "#ff4757" },
          headerTintColor: "#fff",
        }} 
      />

      {/* Trusted Contacts Screen */}
      <Stack.Screen 
        name="screens/ContactsScreen" 
        options={{ 
          title: "Trusted Contacts",
          headerStyle: { backgroundColor: "#ff4757" },
          headerTintColor: "#fff",
        }} 
      />

      {/* Settings Screen */}
      <Stack.Screen 
        name="screens/SettingsScreen" 
        options={{ 
          title: "Settings",
          headerStyle: { backgroundColor: "#ff4757" },
          headerTintColor: "#fff",
        }} 
      />
    </Stack>
  );
}

