import React from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { Icon, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { colors, typography } from "@/css/globals";

export default function MyFormsCard({
  title,
  subheader,
  footnote,
  isImportant,
}) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title === "Canadian Pension Plan") {
      navigation.navigate("LibraryScreen"); 
    } else if (title === "Disability Tax Credit") {
      navigation.navigate("Folder"); // Navigate to LibraryScreen
    } else if (title === "Assisted Living Application") {
      navigation.navigate("Home"); // Navigate to HOME!
    } else {
      console.error("No navigation target defined for this form.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.touchContainer}
      onPress={handlePress} // Call navigation logic directly
    >
      <View style={styles.cardContainer}>
        <Layout style={styles.contentContainer}>
          <View style={styles.previewContainer}>
            <Image
              style={styles.filePreview}
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
          <Icon name="more-vertical-outline" style={styles.dotsIcon} fill="#000" />
        </Layout>
      </View>
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
    paddingVertical: 12,
    paddingHorizontal: 12,
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
  previewContainer: {},
  filePreview: {
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
    color: colors.light.deepBlue60,
    marginTop: 4,
  },

  dotsIcon: {
    width: 24,
    height: 24,
  },
});
