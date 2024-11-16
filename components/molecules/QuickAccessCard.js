import React from "react";
import { Text } from "@ui-kitten/components";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { colors, typography } from "@/css/globals";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

export default function QuickAccessCard({ title, description, destination }) {
  // const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.touchContainer}
      // onPress={() => navigation.navigate(destination)}
    >
      <BlurView intensity={16} style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.button}>Start form</Text>
          </View>
          <Image
            source={require("@/assets/images/previewImage2.png")}
            style={styles.cardImage}
          />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: "transparent",
  },
  cardContainer: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.apple.glass70,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardImage: {
    width: 88,
    height: 110,
    shadowColor: colors.apple.black20,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "show",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 228,
  },
  title: {
    ...typography(true).h4Med,
    marginBottom: 8,
  },
  description: {
    ...typography(true).footnote,
    color: colors.apple.secondaryText,
    marginBottom: 16,
  },
  button: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
  },
});
