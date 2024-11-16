import React from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { Icon, Layout } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import { BlurView } from "expo-blur";

export default function FormListCard({
  title,
  subheader,
  footnote,
  isImportant,
}) {
  return (
    <TouchableOpacity style={styles.touchContainer}>
      <BlurView intensity={16} style={styles.cardContainer}>
        <Layout style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.fileIcon}
              source={require("@/assets/images/previewImage2.png")}
            />
            {isImportant && (
              <Icon name="star" style={styles.starIcon} fill="#2E8BB7" />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subheader}>{subheader}</Text>
            <Text style={styles.footnote}>{footnote}</Text>
          </View>
          <Icon
            name="more-vertical-outline"
            style={styles.dotsIcon}
            fill="#000000"
          />
        </Layout>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: "transparent",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    // backgroundColor: colors.apple.glass70,
    // borderWidth: 1,
    // borderColor: colors.apple.lightStroke,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  iconContainer: {},
  fileIcon: {
    width: 48,
    height: 60,
    shadowColor: colors.apple.black20,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "show",
  },
  starIcon: {
    position: "absolute",
    top: -5,
    left: -5,
    width: 18,
    height: 18,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography(true).h4Med,
  },
  subheader: {
    ...typography(true).body,
  },
  footnote: {
    ...typography(true).footnoteItalic,
    color: colors.apple.secondaryText,
    marginTop: 4,
  },

  dotsContainer: {},
  dotsIcon: {
    width: 24,
    height: 24,
  },
});
