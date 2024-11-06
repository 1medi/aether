import React, { useState } from "react";
import { View, Image, TextInput, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogIn = () => {
    router.push({ pathname: "/(tabs)/home.component", params: { username } });
  };

  const handleContinueAsGuest = () => {
    router.push("/(tabs)/home.component");
  };

  return (
    <LinearGradient
      colors={["#88B5DF", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Image
          source={require("@/assets/images/aether_logo.png")}
          resizeMode="contain"
          style={{ width: 256, height: 128, marginBottom: 48, marginTop: 48 }}
        />
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{ marginBottom: 16, height: 48, backgroundColor: "white", borderRadius: 24, paddingHorizontal: 16 }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 16, height: 48, backgroundColor: "white", borderRadius: 24, paddingHorizontal: 16 }}
          />
          <Pressable
            style={{ backgroundColor: "#1E90FF", height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center", marginBottom: 16 }}
            onPress={handleLogIn}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Sign In</Text>
          </Pressable>
          <Pressable onPress={handleContinueAsGuest}>
            <Text style={{ textAlign: "center", fontSize: 16, textDecorationLine: "underline" }}>
              Continue as guest
            </Text>
          </Pressable>
          <Pressable onPress={() => router.push("/(tabs)/Auth/RegisterPage")}>
            <Text style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}>
              Don't have an account? <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>Create one.</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
