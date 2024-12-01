import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Layout, Button, Icon, Divider } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography } from "@/css/globals";
import { useDarkMode } from "../context/DarkModeContext";

export default function SavedProfile({ route, navigation }) {
  const { isDarkMode } = useDarkMode();
  const { profile } = route.params;

  const styles = useMemo(() => {
    console.log("Recalculating styles for dark mode:", isDarkMode);
    return getStyles(isDarkMode);
  }, [isDarkMode]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>No profile data available.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { personalInfo, address, emergencyContact } = profile;
  
  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
        <LinearGradient
          colors={
            isDarkMode
              ? ['transparent', colors.dark.black] // Smooth dark gradient
              : [colors.apple.offWhite, "#D8ECFF"] // Smooth light gradient
          }
          style={styles.bgGradient}
          start={{ x: 0.5, y: 0.75 }} // Adjust the starting point
          end={{ x: 0.5, y: 1 }} // Adjust the ending point
        >
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButtonContainer}
      >
        <Icon
          name="arrow-back"
          style={styles.backIcon}
          width={24}
          height={24}
          fill={colors.apple.black}
        />
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture and Name */}
        <View style={styles.profileHeader}>
          <Image source={personalInfo.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{personalInfo.fullName}</Text>
          <Text style={styles.profileRole}>
            {personalInfo.relationshipToUser}
          </Text>
        </View>

        {/* Personal Info Section */}
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Personal Info</Text>
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{personalInfo.fullName}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="person-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{personalInfo.phoneNumber}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="phone-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{personalInfo.dateOfBirth}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="calendar-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{personalInfo.gender}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="arrow-ios-downward-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>
                {personalInfo.relationshipToUser}
              </Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="arrow-ios-downward-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Address</Text>
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{address.streetAddress}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="pin-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{address.province}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="arrow-ios-downward-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{address.city}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="arrow-ios-downward-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{address.postalCode}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="home-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
        </View>

        {/* Emergency Contact Section */}
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Emergency Contact</Text>
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{emergencyContact.fullName}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="people-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{emergencyContact.phoneNumber}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="phone-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>{emergencyContact.email}</Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="email-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoItem}>
            <View style={styles.leftSide}>
              <Text style={styles.infoText}>
                {emergencyContact.relationshipToProfile}
              </Text>
            </View>
            <View style={styles.rightSide}>
              <Icon
                name="arrow-ios-downward-outline"
                fill={colors.apple.black}
                width={24}
                height={24}
              />
            </View>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity style={styles.touchContainer}>
          <Layout style={styles.deleteSection}>
            <Button
              status="danger"
              appearance="filled"
              style={styles.deleteButton}
            >
              Delete Profile
            </Button>
          </Layout>
        </TouchableOpacity>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode) => ({
  bgGradient: {
    flex: 1,
    // paddingBottom: 132,
  },

  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    gap: 16,
  },

  backButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  backButton: {
    ...typography(true).h3Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: 100,
    marginBottom: 16,
  },
  profileName: {
    ...typography(true).h2Med,
    color: isDarkMode ? colors.apple.white : '',
  },
  profileRole: {
    ...typography(true).h4,
    color: isDarkMode ? colors.dark.deepWhite60 : colors.apple.secondaryText,
  },

  category: {
    backgroundColor: isDarkMode ? colors.dark.darkGrey80 : colors.apple.white,
    marginHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderColor: isDarkMode ? colors.apple.glass20 : colors.apple.lightStroke,
    borderWidth: 1,
  },
  categoryTitle: {
    marginBottom: 8,
    ...typography(true).h4Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 56,
  },
  infoText: {
    backgroundColor: isDarkMode ? "transparent" : colors.apple.white,
    borderRadius: 100,
    ...typography(true).body,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  divider: {
    marginHorizontal: 12,
    backgroundColor: isDarkMode
      ? colors.apple.glass20
      : colors.apple.lightStroke,
  },

  deleteSection: {
    backgroundColor: "transparent"
  },
  touchContainer: {
    backgroundColor: "transparent",
  },
  deleteButton: {
    borderRadius: 100,
    marginHorizontal: 12,
    backgroundColor: colors.apple.red,
    height: 56,
  },
});