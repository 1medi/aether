import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

// Main component to display and manage "My Files" screen
export const MyFilesScreen = () => {
  const [activeTab, setActiveTab] = useState("Forms"); // Active tab state: "Forms" or "Profiles"
  const [filteredData, setFilteredData] = useState(myFormsData); // Data filtered based on active tab or search query
  const [selectedProfile, setSelectedProfile] = useState(null); // Tracks the selected profile for details view

  const TipsIcon = (props) => <Icon name="bulb-outline" {...props} />;
  const CloseIcon = (props) => <Icon name="close-outline" {...props} />;

  // Handles search input and updates filtered data
  const onSearch = (query) => {
    const data = activeTab === "Forms" ? myFormsData : savedProfilesData;

    if (query.trim() === "") {
      setFilteredData(data); // Reset to original data if search query is empty
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = data.filter((item) =>
      activeTab === "Forms"
        ? item.title.toLowerCase().includes(lowerQuery) // Filter by title for forms
        : item.name.toLowerCase().includes(lowerQuery) // Filter by name for profiles
    );

    setFilteredData(filtered);
  };

  // Switches between "Forms" and "Profiles" tabs and resets data
  const switchTab = (tab) => {
    setActiveTab(tab);
    setFilteredData(tab === "Forms" ? myFormsData : savedProfilesData);
  };

  // Renders the detailed view of a selected profile
  const renderProfileDetails = (profile) => (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ padding: 16 }}>
        {/* Back button to return to profiles list */}
        <TouchableOpacity onPress={() => setSelectedProfile(null)}>
          <Text style={{ color: "blue", marginBottom: 16 }}>← Back to Profiles</Text>
        </TouchableOpacity>
        {/* Display profile details */}
        <View style={styles.detailsContainer}>
          <Image source={profile.image} style={styles.profileImage} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>(123) 456-7890</Text>
          <Text style={styles.detailLabel}>Date of Birth:</Text>
          <Text style={styles.detailValue}>November 21, 1992</Text>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailValue}>Male</Text>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>123 Street, Apt 2B</Text>
          <Text style={styles.detailValue}>A1B 2C3</Text>
        </View>
      </View>
    </ScrollView>
  );

  // Renders the profiles tab with a list of profiles or details of a selected profile
  const renderProfiles = () => (
    selectedProfile ? (
      renderProfileDetails(selectedProfile) // If a profile is selected, render its details
    ) : (
      <ScrollView style={styles.scrollContainer}>
        <View style={{ height: 16 }} />
        {/* Suggestion banner */}
        <Layout style={styles.suggestionBanner}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <TipsIcon fill={colors.apple.black} style={styles.tipsIcon} />
              <Text style={styles.suggestionTitle}>
                Save Time, Reduce Stress
              </Text>
            </View>
            <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
          </View>
          <Text style={styles.suggestionDescription}>
            Store your care recipients' information for quick, two-tap autofilling.
          </Text>
        </Layout>
        <View style={{ height: 24 }} />
        {/* List of profiles */}
        <View style={styles.profileContainer}>
          {filteredData.map((profile, index) => (
            <View key={`${profile.id}-${index}`} style={styles.profileCardContainer}>
              <TouchableOpacity onPress={() => setSelectedProfile(profile)}>
                <SavedProfileCard
                  key={profile.id}
                  name={profile.name}
                  role={profile.role}
                  image={profile.image}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={{ height: 56 }} />
        {/* Footer */}
        <Layout style={styles.bottomSpacerSection}>
          <Image
            source={require("@/assets/images/logo40.png")}
            style={styles.bottomSpacerLogo}
          />
          <Text style={styles.bottomMessage}>Aether • 2024</Text>
        </Layout>
        <View style={{ height: 98 }} />
      </ScrollView>
    )
  );
  

  // Renders the forms tab with a list of forms
  const renderForms = () => (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ height: 16 }} />
      {/* Suggestion banner */}
      <Layout style={styles.suggestionBanner}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TipsIcon fill={colors.apple.black} style={styles.tipsIcon} />
            <Text style={styles.suggestionTitle}>Try Our Scan Feature!</Text>
          </View>
          <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
        </View>
        <Text style={styles.suggestionDescription}>
          Tap the "+" button to upload your own forms. Either take a photo or
          upload directly from your device.
        </Text>
      </Layout>
      <View style={{ height: 24 }} />
      {/* List of forms */}
      <Layout style={styles.sectionContainer}>
        <Layout style={styles.myFormsSection}>
          {filteredData.map((form, index) => (
            <View key={`${form.id}-${index}`}>
              <MyFormsCard
                title={form.title}
                subheader={form.subheader}
                footnote={form.footnote}
              />
              {index < filteredData.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </View>
          ))}
        </Layout>
      </Layout>
      <View style={{ height: 56 }} />
      {/* Footer */}
      <Layout style={styles.bottomSpacerSection}>
        <Image
          source={require("@/assets/images/logo40.png")}
          style={styles.bottomSpacerLogo}
        />
        <Text style={styles.bottomMessage}>Aether • 2024</Text>
      </Layout>
      <View style={{ height: 98 }} />
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.fullPage}>
      {/* Toggle buttons for switching tabs */}
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
      {/* Header with search bar */}
      <Header
        title="My Files"
        placeholder="Search my forms and profiles"
        hasSearchBar
        onSearch={onSearch}
        noTitle
      />
      {/* Render content based on the active tab */}
      {activeTab === "Forms"
  ? renderForms()
  : selectedProfile
  ? renderProfileDetails(selectedProfile)
  : renderProfiles()}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
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
    backgroundColor: colors.apple.white,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.apple.lightStroke,
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
  // headline: {
  //   marginBottom: 8,
  //   ...typography(true).h4Med,
  //   color: colors.apple.black,
  // },
  // headlineButton: {
  //   width: 24,
  //   height: 24,
  // },
  // subhead: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: "transparent",
  //   paddingHorizontal: 12,
  // },
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
