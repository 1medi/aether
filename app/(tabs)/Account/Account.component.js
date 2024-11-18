import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Toggle,
  Divider,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";

export const AccountScreen = ({ navigation }) => {
  const ArrowIcon = (props) => (
    <Icon name="arrow-ios-forward-outline" {...props} style={styles.icon} />
  );

  const MoonIcon = (props) => (
    <Icon name="moon-outline" {...props} style={styles.icon} />
  );

  const SectionItem = ({ label, onPress, accessoryLeft, accessoryRight }) => (
    <TouchableOpacity onPress={onPress}>
      <Layout appearance="ghost" style={styles.sectionItem}>
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
      <Header title="Account" />
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
          <Layout style={styles.sectionItem}>
            <Layout style={styles.leftSide}>
              <MoonIcon />
              <Text style={styles.sectionItemText}>Dark Mode</Text>
            </Layout>
            <Layout style={styles.rightSide}>
              <Toggle status="primary" onChange={() => {}} />
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
    </SafeAreaView>
  );
};

const styles = {
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
    // gap: 4,
    gap: 8,
  },
  section: {
    backgroundColor: colors.apple.white,
    marginHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  sectionTitle: {
    marginBottom: 8,
    ...typography(true).h4Med,
    color: colors.apple.black,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  sectionItem: {
    backgroundColor: colors.apple.white,
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
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  sectionItemText: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
  },
  divider: {
    marginHorizontal: 32,
    backgroundColor: colors.apple.lightStroke,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.apple.black,
  },
  logoutSection: {
    backgroundColor: "transparent",
    marginHorizontal: 12,
    marginTop: 24,
  },
  logoutButton: {
    borderRadius: 100,
    borderWidth: 1,
    height: 56,
    borderColor: colors.apple.red,
    backgroundColor: colors.apple.white,
  },
};

export default AccountScreen;
