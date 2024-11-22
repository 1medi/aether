import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from "react-native";
import { Icon, Layout } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";

export default function SavedProfileCard({
  image,
  name,
  role,
  destination,
}) {

  return (
      <ImageBackground
        source={image}
        style={styles.cardBackground}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,1)"]}
          style={styles.gradientOverlay}
        >
          <Layout style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </Layout>
        </LinearGradient>
      </ImageBackground>
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
    // gap: 8,
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
