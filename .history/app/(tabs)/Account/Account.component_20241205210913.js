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

const AccountScreen = ({ navigation }) => {
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
    backgroundColor: isDarkMode ? "black" : "white",
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
  section: {
    backgroundColor: isDarkMode ? "#333" : "white",
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: isDarkMode ? "white" : "black",
  },
  divider: {
    marginVertical: 12,
    backgroundColor: isDarkMode ? "#555" : "#ddd",
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: isDarkMode ? "white" : "black",
  },
});

export default AccountScreen;
