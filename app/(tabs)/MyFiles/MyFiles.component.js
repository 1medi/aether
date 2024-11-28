import React, { useState, useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import SavedProfileCard from "@/components/atoms/SavedProfileCard";
import Header from "@/components/header/Header";
import myFormsData from "@/data/MyFormsData";
import savedProfilesData from "@/data/SavedProfilesData";
import ConsoleScreenTwo from "@/components/atoms/ConsoleScreenTwo";
import ConsoleScreen from "@/components/atoms/ConsoleScreen";
import { useDarkMode } from "../context/DarkModeContext";
import PensionPlanModal from "./PensionPlanModal";
import FetchParaphrases from "@/src/fetchparaphrases"

export const MyFilesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Forms");
  const [filteredData, setFilteredData] = useState(myFormsData);
  const [showFormsSuggestionBanner, setShowFormsSuggestionBanner] =
    useState(true);
  const [showProfilesSuggestionBanner, setShowProfilesSuggestionBanner] =
    useState(true);

  const { isDarkMode } = useDarkMode();

  const styles = getStyles(isDarkMode);

  const TipsIcon = (props) => <Icon name="bulb-outline" {...props} />;
  const CloseIcon = (props) => <Icon name="close-outline" {...props} />;

  // Search Function
  const onSearch = (query) => {
    const data = activeTab === "Forms" ? myFormsData : savedProfilesData;

    if (query.trim() === "") {
      setFilteredData(data); // Reset to original data
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = data.filter((item) => {
      if (activeTab === "Forms") {
        return item.title.toLowerCase().includes(lowerQuery);
      } else {
        // const fullName = profile.personalInfo.fullName || ""; // Safely access fullName
        return item.personalInfo.fullName.toLowerCase().includes(lowerQuery);
      }
    });

    setFilteredData(filtered);
  };

  // Switch tabs and reset data accordingly
  const switchTab = (tab) => {
    setActiveTab(tab);
    setFilteredData(tab === "Forms" ? myFormsData : savedProfilesData);
  };

  // Render Forms
  const renderForms = () => (
    <>
      <ScrollView style={styles.scrollContainer}>
        {/* Suggestion Banner */}
        {showFormsSuggestionBanner && (
          <Layout style={styles.suggestionBanner}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <TipsIcon fill={colors.apple.black} style={styles.tipsIcon} />
                <Text style={styles.suggestionTitle}>
                  Try Our Scan Feature!
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowFormsSuggestionBanner(false)}
              >
                <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.suggestionDescription}>
              Tap the "+" button to upload your own forms. Either take a photo
              or upload directly from your device.
            </Text>
          </Layout>
        )}

        <Layout style={styles.myFormsSection}>
          {filteredData.map((form, index) => (
            <View key={`${form.id}-${index}`}>
              <MyFormsCard
                title={form.title}
                subheader={form.subheader}
                footnote={form.footnote}
                isImportant={form.isImportant}
                navigation={navigation} // Pass navigation prop
                onClick
              />
              {index < filteredData.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </View>
          ))}
        </Layout>

        {/* Spacer */}
        <View style={{ height: 56 }} />

        {/* End Image */}
        <Layout style={styles.bottomSpacerSection}>
          <Image
            source={require("@/assets/images/logo40.png")}
            style={styles.bottomSpacerLogo}
          />
          <Text style={styles.bottomMessage}>Aether • 2024</Text>
        </Layout>

        {/* Spacer */}
        <View style={{ height: 98 }} />
      </ScrollView>
      <ConsoleScreen />
    </>
  );

  // Render Profiles
  const renderProfiles = () => (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggestion Banner */}
        {showProfilesSuggestionBanner && (
          <Layout style={styles.suggestionBanner}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <TipsIcon fill={colors.apple.black} style={styles.tipsIcon} />
                <Text style={styles.suggestionTitle}>
                  Save Time, Reduce Stress
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowProfilesSuggestionBanner(false)}
              >
                <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.suggestionDescription}>
              Store your care recipients' information for quick, two-tap
              autofilling.
            </Text>
          </Layout>
        )}
        <View style={styles.profileContainer}>
          {filteredData.map((profile, index) => (
            <View
              key={`${profile.id}-${index}`}
              style={styles.profileCardContainer}
            >
              <SavedProfileCard
                // key={profile.id}
                name={profile.personalInfo.fullName}
                // role={profile.personalInfo.relationshipToUser}
                // image={profile.personalInfo.image}
                // navigation={navigation}
                // profileData={profile}
                profile={profile}
              />
            </View>
          ))}
        </View>
        {/* Spacer */}
        <View style={{ height: 56 }} />
        {/* End Image */}
        <Layout style={styles.bottomSpacerSection}>
          <Image
            source={require("@/assets/images/logo40.png")}
            style={styles.bottomSpacerLogo}
          />
          <Text style={styles.bottomMessage}>Aether • 2024</Text>
        </Layout>
        {/* Spacer */}
        <View style={{ height: 98 }} />
      </ScrollView>
      <ConsoleScreenTwo />
    </>
  );

  const renderHistory = () => {
    return (
      <ScrollView style={styles.scrollContainer}>
        <FetchParaphrases/>
      </ScrollView>
    );
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
        {/* Header and Search Bar */}
        <Header
          title="My Files"
          placeholder="Search my forms and profiles"
          hasSearchBar
          onSearch={onSearch}
          isDarkMode={isDarkMode}
          // noTitle
        />
        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          {["Forms", "Profiles", "History"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.toggleButton,
                activeTab === tab && styles.activeToggleButton,
              ]}
              onPress={() => switchTab(tab)}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  activeTab === tab && styles.activeToggleButtonText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render Forms or Profiles */}
        {activeTab === "Forms"
          ? renderForms()
          : activeTab === "Profiles"
            ? renderProfiles()
            : renderHistory()}
      </LinearGradient>
    </SafeAreaView>
  );
};

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
    paddingTop: 16,
    paddingBottom: 132,
    gap: 8,
  },

  toggleContainer: {
    flexDirection: "row",
    // backgroundColor: colors.apple.white,
    // borderRadius: 100,
    // borderWidth: 1,
    // width: 200,
    borderColor: isDarkMode
      ? colors.dark.deepWhite20
      : colors.apple.lightStroke,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
  toggleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  activeToggleButton: {
    borderBottomWidth: 4,
    borderColor: colors.light.blue,
    // borderRadius: 100,
    // backgroundColor: colors.apple.white,
    // borderWidth: 1,
    // borderColor: colors.apple.lightStroke,
  },
  toggleButtonText: {
    ...typography(true).h4,
    color: isDarkMode ? colors.dark.deepWhite60 : colors.apple.secondaryText,
    paddingHorizontal: 5,
  },
  activeToggleButtonText: {
    ...typography(true).h4Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },

  suggestionBanner: {
    backgroundColor: "transparent",
    marginTop: 8,
    marginBottom: 24,
    // marginVertical: 24,
    marginHorizontal: 24,
    gap: 8,
  },
  tipsIcon: {
    width: 24,
    height: 24,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  suggestionTitle: {
    ...typography(true).bodyMed,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  suggestionDescription: {
    ...typography(true).footnote,
    color: isDarkMode ? colors.dark.deepWhite60 : colors.apple.secondaryText,
  },

  myFormsSection: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    backgroundColor: isDarkMode ? colors.dark.darkGrey80 : colors.apple.white,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: isDarkMode ? colors.apple.glass20 : colors.apple.lightStroke,
  },

  divider: {
    marginHorizontal: 24,
    backgroundColor: isDarkMode
      ? colors.apple.glass20
      : colors.apple.lightStroke,
  },

  profileContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 12,
    // gap: 4,
  },

  gradientOverlay: {
    display: "flex",
    flex: 1,
  },
  profileCardContainer: {
    // width: "49.4%",
    width: "50%",
  },

  profileName: {
    ...typography(true).h4Med,
    color: isDarkMode ? colors.dark.darkGrey80 : colors.apple.white,
  },
  profileRole: {
    ...typography(true).footnote,
    color: isDarkMode ? colors.dark.darkGrey80 : colors.apple.glass70,
  },

  bottomSpacerSection: {
    backgroundColor: "transparent",
    gap: 16,
  },
  bottomSpacerLogo: {
    backgroundColor: "transparent",
    width: 102,
    height: 88,
    alignSelf: "center",
  },
  bottomMessage: {
    ...typography(true).bodyMed,
    color: isDarkMode ? colors.apple.glass20 : colors.light.deepBlue40,
    textAlign: "center",
  },
});

export default MyFilesScreen;
