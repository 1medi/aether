import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "@/css/globals";

export default function SavedProfileCard({ profile }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (profile) {
      navigation.navigate("SavedProfile", { profile });
    } else {
      console.error("No profile data provided.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.touchContainer}
      onPress={handlePress} // Navigate with profile data
    >
      <ImageBackground
        source={profile.personalInfo.image}
        style={styles.cardBackground}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        >
          <Layout style={styles.textContainer}>
            <Text style={styles.name}>{profile.personalInfo.fullName}</Text>
            <Text style={styles.role}>
              {profile.personalInfo.relationshipToUser}
            </Text>
          </Layout>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: "transparent",
  },
  cardBackground: {
    width: "100%",
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  name: {
    ...typography(true).h4Med,
    color: colors.apple.white,
  },
  role: {
    ...typography(true).footnote,
    color: colors.apple.glass70,
  },
});