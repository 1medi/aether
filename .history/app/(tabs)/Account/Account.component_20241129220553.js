import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  Layout,
  Button,
  Icon,
  Toggle,
  Divider,
} from "@ui-kitten/components";
import AppText from "./AppText"; 
const Text = AppText; 

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDarkMode } from "../context/DarkModeContext";
import { useTextSize } from "./TextSizeContext";
import { Slider } from "@react-native-community/slider";

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize();

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6">Change Text Size</Text>
      <Slider
        style={{ height: 40 }}
        minimumValue={12}
        maximumValue={24}
        step={1}
        value={textSize}
        onValueChange={setTextSize}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
      />
      <Text>Text Size: {textSize}px</Text>
    </Layout>
  );
};

export const AccountScreen = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const styles = useMemo(() => {
    console.log("Recalculating styles for dark mode:", isDarkMode);
    return getStyles(isDarkMode);
  }, [isDarkMode]);

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
            ? ['transparent', colors.dark.black] // Smooth dark gradient
            : [colors.apple.offWhite, "#D8ECFF"] // Smooth light gradient
        }
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }} // Adjust the starting point for visual appeal
        end={{ x: 0.5, y: 1 }} // Adjust the ending point
      >
        <Header
          title="Account"
          isDarkMode={isDarkMode} // Pass the dark mode state
        />
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
            {/* <SectionItem
              label="Set Language"
              onPress={() => {}}
              accessoryLeft="globe-2-outline"
              accessoryRight={ArrowIcon}
            /> */}
            <SectionItem
              label="Change Text Size"
              onPress={() => navigation.navigate("ChangeTextSize")}
              accessoryLeft="globe-2-outline"
              accessoryRight={ArrowIcon}
            />
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

          <Layout style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <SectionItem
              label="FAQ"
              onPress={() => {}}
              accessoryLeft="question-mark-circle-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Contact Support"
              onPress={() => {}}
              accessoryLeft="phone-outline"
              accessoryRight={ArrowIcon}
            />
            <Divider style={styles.divider} />
            <SectionItem
              label="Report an Issue"
              onPress={() => {}}
              accessoryLeft="alert-triangle-outline"
              accessoryRight={ArrowIcon}
            />
          </Layout>

          {/* Log Out Button */}
          <TouchableOpacity style={styles.touchContainer}>
            <Layout style={styles.logoutSection}>
              <Button
                status="danger"
                appearance="outline"
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                Log Out
              </Button>
            </Layout>
          </TouchableOpacity>
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
