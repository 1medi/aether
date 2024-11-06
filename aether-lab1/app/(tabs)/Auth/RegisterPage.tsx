import React, { useState } from "react";
import { View, Image, TextInput, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const userData = {
      username: username,
      useremail: email,
      userpassword: password,
    };
    axios
      .post("http://10.0.0.120:5001/register", userData)
      .then((res) => {
        console.log(res.data);
        router.push({ pathname: "/(tabs)/home.component", params: { username } });
      })
      .catch((error) => {
        console.log("Error during registration:", error);
      });
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
            placeholder="Birthday"
            value={birthday}
            onChangeText={setBirthday}
            style={{ marginBottom: 16, height: 48, backgroundColor: "white", borderRadius: 24, paddingHorizontal: 16 }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
            onPress={handleRegister}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
