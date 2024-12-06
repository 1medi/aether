import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  Layout,
  Button,
  Icon,
  Toggle,
  Divider,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDarkMode } from "../context/DarkModeContext";
import AppText from "./AppText";
const Text = AppText;
import { useTextSize } from "./TextSizeContext";

const fontSizeOptions = [14, 16, 18, 20]; // Define font size options
const defaultTextSize = 16; // Default size

export const AccountScreen = ({ navigation }) => {
  const { textSize, setTextSize } = useTextSize();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Include "Reset to Default" in fontSizeOptions and initialize selectedIndex
  const extendedFontSizeOptions = ["Reset to Default", ...fontSizeOptions];
  const initialIndex = fontSizeOptions.indexOf(textSize) + 1;
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(initialIndex));

  const handleSelect = (index) => {
    setSelectedIndex(index); // Update the selectedIndex immediately
    const newTextSize = index.row === 0 ? defaultTextSize : fontSizeOptions[index.row - 1];

    // Delay updating textSize to avoid React warnings
    setTimeout(() => {
      setTextSize(newTextSize);
    }, 0);
  };

 const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const ArrowIcon = (props) => (
    <Icon name="arrow-ios-forward-outline" {...props} style={styles.icon} />
  );

  const MoonIcon = (props) => (
    <Icon name="moon-outline" {...props} style={styles.icon} />
  );

  const SectionItem = ({ label, onPress, accessoryLeft, accessoryRight }) => (
    <TouchableOpacity onPress={onPress}>
      <Layout style={styles.sectionItem}>
        <Layout style={styles.leftSide}>
          {accessoryLeft && <Icon name={accessoryLeft} style={styles.icon} />}
          <Text style={styles.sectionItemText}>{label}</Text>
        </Layout>
        <Layout style={styles.rightSide}>
          {accessoryRight && accessoryRight()}
        </Layout>
      </Layout>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ["transparent", colors.dark.black] // Smooth dark gradient
            : [colors.apple.offWhite, "#D8ECFF"] // Smooth light gradient
        }
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }} // Adjust the starting point for visual appeal
        end={{ x: 0.5, y: 1 }} // Adjust the ending point
      >
        
      </LinearGradient>
    </SafeAreaView>
  );
};

const getStyles = (isDarkMode) => ({
  bgGradient: {
    flex: 1,
  },

  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
  section: {
    backgroundColor: isDarkMode ? colors.dark.darkGrey80 : colors.apple.white,
    marginHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderColor: isDarkMode ? colors.apple.glass20 : colors.apple.lightStroke,
    borderWidth: 1,
  },
  sectionTitle: {
    marginBottom: 8,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  sectionItem: {
    backgroundColor: isDarkMode ? "transparent" : colors.apple.white,
    borderRadius: 100,
    height: 52,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "transparent",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  sectionItemText: {
    // ...typography().bodyMed,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
    backgroundColor: "transparent",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: isDarkMode ? colors.apple.white : colors.apple.black,
    backgroundColor: "transparent",
  },
  divider: {
    marginHorizontal: 12,
    backgroundColor: isDarkMode
      ? colors.apple.glass20
      : colors.apple.lightStroke,
  },
  logoutSection: {
    backgroundColor: "transparent",
    marginHorizontal: 12,
    // marginTop: 24,
  },
  logoutButton: {
    borderRadius: 100,
    borderWidth: 1,
    height: 56,
    borderColor: colors.apple.lightStroke,
    backgroundColor: isDarkMode ? colors.dark.darkGrey80 : colors.apple.white,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    ...typography(true).h4Med,
    color: isDarkMode ? colors.apple.white : colors.apple.red,
  },
});

export default AccountScreen;
