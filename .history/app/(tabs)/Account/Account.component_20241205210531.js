import React, { useState, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Divider,
  Toggle,
  Icon,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/Header";
import { useDarkMode } from "../context/DarkModeContext";
import { useTextSize } from "./TextSizeContext";
import AppText from "./AppText";

const fontSizeOptions = [14, 16, 18, 20];
const defaultTextSize = 16;

export default AccountScreen = ({ navigation }) => {
  const { textSize, setTextSize } = useTextSize();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Include "Reset to Default" option
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

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={isDarkMode ? ["transparent", "black"] : ["white", "#D8ECFF"]}
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Header title="Account" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Layout style={styles.section}>
            <AppText style={styles.sectionTitle}>Settings</AppText>
            <Select
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              value={
                selectedIndex.row === 0
                  ? "Reset to Default"
                  : `${fontSizeOptions[selectedIndex.row - 1]}px`
              }
            >
              {extendedFontSizeOptions.map((size, index) => (
                <SelectItem
                  key={index}
                  title={typeof size === "string" ? size : `${size}px`}
                />
              ))}
            </Select>
            <Divider style={styles.divider} />
            <Layout style={styles.sectionItem}>
              <Icon name="moon-outline" style={styles.icon} />
              <Toggle
                status="primary"
                onChange={toggleDarkMode}
                checked={isDarkMode}
                accessibilityRole="switch"
                accessibilityLabel="Toggle Dark Mode"
              />
            </Layout>
          </Layout>
        </ScrollView>
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
