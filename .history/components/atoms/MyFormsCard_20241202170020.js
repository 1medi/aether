import React, { useMemo, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View,  Modal } from "react-native";
import { Icon, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "@/css/globals";
import { useDarkMode } from "@/app/(tabs)/context/DarkModeContext";
import PensionPlanModal from "@/app/(tabs)/MyFiles/PensionPlanModal";
import AppText from "@/app/(tabs)/Account/AppText"; 
const Text = AppText; 

export default function MyFormsCard({
  title,
  subheader,
  footnote,
  isImportant,
}) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const { isDarkMode } = useDarkMode();
  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const handlePress = () => {
    if (title === "Extended Health Care") {
      setModalVisible(true);
    } else if (title === "Disability Tax Credit") {
      navigation.navigate("Home");
    } else if (title === "Assisted Living Application") {
      navigation.navigate("Home");
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
              <Icon
                name="star"
                style={styles.starIcon}
                fill={colors.light.blue}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </AppText>
            <AppText style={styles.subheader}>{subheader}</AppText>
            <AppText style={styles.footnote}>{footnote}</AppText>
          </View>
          <Icon
            name="more-vertical-outline"
            style={styles.dotsIcon}
            fill="#000"
          />
        </Layout>
          <PensionPlanModal visible={isModalVisible} onClose={() => setModalVisible(false)}/>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (isDarkMode) => ({
  touchContainer: {
    backgroundColor: "transparent",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 24,
    padding: 12,
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
    top: -68,
    left: -8,
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography(true).bodyMed,
    color: isDarkMode ? colors.apple.white : "",
  },
  subheader: {
    ...typography(true).body,
    color: isDarkMode ? colors.apple.white : "",
  },
  footnote: {
    ...typography(true).footnoteItalic,
    color: isDarkMode ? colors.dark.deepWhite60 : colors.light.deepBlue60,
    marginTop: 4,
  },

  dotsIcon: {
    width: 24,
    height: 24,
  },
});
