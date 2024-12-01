import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";

export default function Button({
  buttonTitle,
  buttonDesc,
  accessory: Accessory,
  destination,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.touchContainer}
      onPress={() => navigation.navigate(destination)}
    >
      <BlurView intensity={16} tint="light" style={styles.buttonContainer}>
        <Layout style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={styles.buttonTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {buttonTitle}
            </Text>
            <Text
              style={styles.buttonDesc}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {buttonDesc}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Accessory
              style={{
                width: 24,
                height: 24,
                tintColor: `${colors.apple.white}`,
              }}
            />
          </View>
        </Layout>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: "transparent",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 24,
    borderColor: colors.apple.glass20,
    borderWidth: 1,
    backgroundColor: colors.apple.glass20,
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    gap: 12,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
  },
  buttonTitle: {
    ...typography(true).h4Med,
    color: colors.apple.white,
  },
  buttonDesc: {
    ...typography(true).footnote,
    color: colors.apple.glass70,
  },
});