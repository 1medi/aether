import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "@/css/globals";
import AppText from "@/app/(tabs)/Account/AppText"; 
const Text = AppText; 

export default function SavedProfileCard({ profile, onPress, navigate }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(profile);
    } else if (navigate && profile) {
      navigation.navigate(navigate, { profile });
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
            <AppText style={styles.name}>{profile.personalInfo.fullName}</AppText>
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
    // ...typography(true).h4Med,
    color: colors.apple.white,
  },
  role: {
    // ...typography(true).footnote,
    color: colors.apple.glass70,
  },
});