import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Layout, Button, Icon, Toggle, Divider } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography } from "@/css/globals";
import { useDarkMode } from "../context/DarkModeContext";

export default function SavedProfile({ route, navigation }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <Icon
              name="arrow-back"
              style={styles.backIcon}
              width="24"
              height="24"
              fill={colors.apple.black}
            />
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
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
              <Text style={styles.infoText}>
                Phone: {personalInfo.phoneNumber}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Date of Birth: {personalInfo.dateOfBirth}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Gender: {personalInfo.gender}</Text>
            </View>
          </View>
          {/* Address Section */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Address</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Street: {address.streetAddress}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>City: {address.city}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>Province: {address.province}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Postal Code: {address.postalCode}
              </Text>
            </View>
          </View>
          {/* Emergency Contact Section */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Emergency Contact</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Name: {emergencyContact.fullName}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Phone: {emergencyContact.phoneNumber}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Email: {emergencyContact.email}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Relationship: {emergencyContact.relationshipToProfile}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },

  backButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 12,
    // marginBottom: 16,
  },
  backButton: {
    ...typography(true).h3Med,
    color: colors.apple.black,
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
    ...typography(true).h1Med,
  },
  profileRole: {
    ...typography(true).h3Italic,
    color: colors.apple.secondaryText,
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
    height: 56,
  },
  infoText: {
    backgroundColor: isDarkMode ? "transparent" : colors.apple.white,
    borderRadius: 100,
    paddingHorizontal: 12,
    ...typography(true).body,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  divider: {
    marginHorizontal: 12,
    backgroundColor: isDarkMode
      ? colors.apple.glass20
      : colors.apple.lightStroke,
  },
});
