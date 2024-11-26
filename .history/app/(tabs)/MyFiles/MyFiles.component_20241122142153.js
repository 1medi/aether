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
import MyFormsCard from "@/components/atoms/MyFormsCard";
import SavedProfileCard from "@/components/atoms/SavedProfileCard";
import Header from "@/components/header/Header";
import myFormsData from "@/data/MyFormsData";
import savedProfilesData from "@/data/SavedProfilesData";
import ConsoleScreenTwo from "@/components/atoms/ConsoleScreenTwo";
import ConsoleScreen from "@/components/atoms/ConsoleScreen";
import { useDarkMode } from "../context/DarkModeContext";

export const MyFilesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Forms");
  const [filteredData, setFilteredData] = useState(myFormsData);
  const [showFormsSuggestionBanner, setShowFormsSuggestionBanner] = useState(true);
  const [showProfilesSuggestionBanner, setShowProfilesSuggestionBanner] = useState(true);

  const { isDarkMode } = useDarkMode();

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);


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
    const filtered = data.filter((item) =>
      activeTab === "Forms"
        ? item.title.toLowerCase().includes(lowerQuery)
        : item.name.toLowerCase().includes(lowerQuery)
    );

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
              <Text style={styles.suggestionTitle}>Try Our Scan Feature!</Text>
            </View>
            <TouchableOpacity onPress={() => setShowSuggestionBanner(false)}>
              <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.suggestionDescription}>
            Tap the "+" button to upload your own forms. Either take a photo or
            upload directly from your device.
          </Text>
        </Layout>
        )}

        <Layout style={styles.sectionContainer}>
          <Layout style={styles.myFormsSection}>
            {filteredData.map((form, index) => (
              <View key={`${form.id}-${index}`}>
                <MyFormsCard
                  title={form.title}
                  subheader={form.subheader}
                  footnote={form.footnote}
                  isImportant={form.isImportant}
                  navigation={navigation} // Pass navigation prop
                />
                {index < filteredData.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </View>
            ))}
          </Layout>
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
      <ScrollView style={styles.scrollContainer}>
        {/* Suggestion Banner */}
        { showProfilesSuggestionBanner && (
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
            <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
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
                key={profile.id}
                name={profile.name}
                role={profile.role}
                image={profile.image}
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
  console.log(filteredData);
  console.log(navigation);
  return (
    <SafeAreaView style={styles.fullPage}>
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        {["Forms", "Profiles"].map((tab) => (
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

      {/* Header and Search Bar */}
      <Header
        title="My Files"
        placeholder="Search my forms and profiles"
        hasSearchBar
        onSearch={onSearch}
        noTitle
      />

      {/* Render Forms or Profiles */}
      {activeTab === "Forms" ? renderForms() : renderProfiles()}
    </SafeAreaView>
  );
};

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    gap: 8,
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors.apple.glass70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
  },
  toggleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  activeToggleButton: {
    borderRadius: 100,
    // backgroundColor: colors.apple.white,
    // borderWidth: 1,
    // borderColor: colors.apple.lightStroke,
  },
  toggleButtonText: {
    ...typography(true).h4,
    color: colors.apple.secondaryText,
  },
  activeToggleButtonText: {
    ...typography(true).h4Med,
    color: colors.apple.black,
  },

  suggestionBanner: {
    backgroundColor: "transparent",
    marginTop: 4,
    marginBottom: 16,
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
    color: colors.apple.black,
  },
  suggestionDescription: {
    ...typography(true).footnote,
    color: colors.apple.secondaryText,
  },

  sectionContainer: {
    backgroundColor: colors.apple.white,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  myFormsSection: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
  },

  divider: {
    marginHorizontal: 24,
    backgroundColor: colors.apple.lightStroke,
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
    color: colors.apple.white,
  },
  profileRole: {
    ...typography(true).footnote,
    color: colors.apple.glass70,
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
    color: colors.light.deepBlue40,
    textAlign: "center",
  },
  tagline: {
    ...typography(true).body,
    color: colors.apple.secondaryText,
  },
});

export default MyFilesScreen;
