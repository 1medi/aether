import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, TouchableOpacity,  } from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Toggle,
  Divider,
  Select, 
  SelectItem,
  Index
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDarkMode } from "../context/DarkModeContext";

const TEXT_SIZE_OPTIONS = [
  { label: 'Small', value: 12 },
  { label: 'Medium', value: 16 },
  { label: 'Large', value: 20 },
  { label: 'Extra Large', value: 24 },
];

export const AccountScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [textSize, setTextSize] = useState(16); // Default text size

  // Handle text size change
  const handleTextSizeChange = (index) => {
    setTextSize(TEXT_SIZE_OPTIONS[index].value);
  };

  const styles = useMemo(() => {
    return getStyles(isDarkMode, textSize);
  }, [isDarkMode, textSize]);

  // Calculate the selected index directly as a number
  const selectedIndex = TEXT_SIZE_OPTIONS.findIndex(item => item.value === textSize);

  const ArrowIcon = (props) => (
    <Icon name="arrow-ios-forward-outline" {...props} style={styles.icon} />
  );

  const MoonIcon = (props) => (
    <Icon name="moon-outline" {...props} style={styles.icon} />
  );

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ['transparent', colors.dark.black]
            : [colors.apple.offWhite, "#D8ECFF"]
        }
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Header title="Account" isDarkMode={isDarkMode} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Layout style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <SectionItem
              label="Edit Account Info"
              onPress={() => {}}
              accessoryLeft="edit-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Change Password"
              onPress={() => {}}
              accessoryLeft="lock-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Set Language"
              onPress={() => {}}
              accessoryLeft="globe-2-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            {/* Add Dropdown for Text Size */}
            <Layout style={styles.sectionItem}>
              <Layout style={styles.leftSide}>
                <Text style={styles.sectionItemText}>Text Size</Text>
              </Layout>
              <Layout style={styles.rightSide}>
                <Select
                  selectedIndex={selectedIndex} // Use the number directly here
                  onSelect={index => handleTextSizeChange(index.row)}
                  style={{ width: 120 }}
                >
                  {TEXT_SIZE_OPTIONS.map((option, idx) => (
                    <SelectItem key={idx} title={option.label} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Divider style={styles.divider} />
            <Layout style={styles.sectionItem}>
              <Layout style={styles.leftSide}>
                <MoonIcon />
                <Text style={styles.sectionItemText}>Dark Mode</Text>
              </Layout>
              <Layout style={styles.rightSide}>
                <Toggle
                  status="primary"
                  onChange={toggleDarkMode}
                  checked={isDarkMode}
                  accessibilityRole="switch"
                  accessibilityLabel="Toggle Dark Mode"
                />
              </Layout>
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
    ...typography(true).h4Med,
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
    height: 56,
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
    ...typography(true).bodyMed,
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
  },
});

export default AccountScreen;
