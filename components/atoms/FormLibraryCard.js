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
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function FormLibraryCard({
  image,
  title,
  description,
  destination,
}) {
  const ArrowIcon = (props) => <Icon name="arrow-forward-outline" {...props} />;

  return (
    <TouchableOpacity style={styles.touchContainer}>
      <ImageBackground
        source={image}
        style={styles.cardBackground}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,1)"]}
          style={styles.gradientOverlay}
        >
          <Layout style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </Layout>
          <View style={styles.iconContainer}>
            <BlurView intensity={16} style={styles.iconBackground}>
              <ArrowIcon
                style={{
                  width: 32,
                  height: 32,
                  tintColor: `${colors.apple.white}`,
                }}
              />
            </BlurView>
          </View>
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
    height: 304,
    borderRadius: 24,
    overflow: "hidden",
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 8,
    gap: 8,
  },
  textContainer: {
    backgroundColor: "transparent",
    gap: 8,
  },
  title: {
    ...typography(true).h2Med,
    color: colors.apple.white,
  },
  description: {
    ...typography(true).footnote,
    color: colors.apple.glass70,
  },

  iconContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
  },
  iconBackground: {
    backgroundColor: colors.apple.glass20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.glass20,
    padding: 8,
    overflow: "hidden",
  },
});
