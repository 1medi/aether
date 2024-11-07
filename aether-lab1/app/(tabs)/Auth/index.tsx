import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
export default function LandingPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const handleGetStarted = () => {
    navigation.navigate("LogInPage")
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
          source={require("../../../assets/images/aether_logo.png")}
          resizeMode="contain"
          style={{ width: 256, height: 128 }}
        />
        <Pressable
          onPress={handleGetStarted}
          style={{
            backgroundColor: "#1E90FF",
            height: 48,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
            marginTop: 24,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Get Started</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
