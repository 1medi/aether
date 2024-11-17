import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import { LinearGradient } from "expo-linear-gradient";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import SavedProfileCard from "@/components/atoms/SavedProfileCard";
import Header from "@/components/header/Header";
import myFormsData from "@/app/data/MyFormsData";
import savedProfilesData from "@/app/data/SavedProfilesData";

export const MyFilesScreen = () => {
  const [activeTab, setActiveTab] = useState("Forms");
  const [myForms, setMyForms] = useState(myFormsData);
  const [savedProfiles, setSavedProfiles] = useState(savedProfilesData);

  const profiles = [
    { id: 1, name: "Chris Topher", role: "Myself" },
    { id: 2, name: "Sarah O'Neil", role: "Care Recipient" },
    { id: 3, name: "Pat Rick", role: "Grandpa" },
  ];

  // Forms Render
  const renderForms = () => {
    // const filteredForms = forms.filter((form) => {
    //   if (filter === "In progress") return form.status === "In progress";
    //   if (filter === "Complete") return form.status === "Complete";
    //   return true;
    // });
    return (
      <ScrollView style={styles.scrollContainer}>
        <Layout style={styles.sectionContainer}>
          <Layout style={styles.subhead}>
            <Text style={styles.headline}>History</Text>
          </Layout>
          <Layout style={styles.myFormsSection}>
            {myForms.map((form, index) => (
              <React.Fragment key={form.id}>
                <View style={styles.formButtonContainer}>
                  <MyFormsCard
                    title={form.title}
                    subheader={form.subheader}
                    footnote={form.footnote}
                  />
                </View>
                {index < myForms.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </Layout>
        </Layout>

        {/* Spacer */}
        {/* <View style={{ height: 40 }} /> */}

        {/* End Image */}
        {/* <Layout style={styles.bottomSpacerSection}>
          <Image
            source={require("@/assets/images/logo40.png")}
            style={styles.bottomSpacerLogo}
          />
        </Layout> */}
      </ScrollView>
    );
  };

  // Profiles Render
  const renderProfiles = () => {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {savedProfiles.map((profile) => (
            <View key={profile.id} style={styles.profileCardContainer}>
              <SavedProfileCard 
                name={profile.name} 
                role={profile.role} 
                image={profile.image}
                />
            </View>
          ))}
        </View>

        {/* Spacer */}
        {/* <View style={{ height: 40 }} /> */}

        {/* End Image */}
        {/* <Layout style={styles.bottomSpacerSection}>
          <Image
            source={require("@/assets/images/logo40.png")}
            style={styles.bottomSpacerLogo}
          />
        </Layout> */}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Forms" && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab("Forms")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeTab === "Forms" && styles.activeToggleButtonText,
            ]}
          >
            Forms
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Profiles" && styles.activeToggleButton,
          ]}
          onPress={() => setActiveTab("Profiles")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeTab === "Profiles" && styles.activeToggleButtonText,
            ]}
          >
            Profiles
          </Text>
        </TouchableOpacity>
      </View>
      <Header
        title={"My Files"}
        placeholder={"Search my forms and profiles"}
        hasSearchBar
        noTitle
      />
      {activeTab === "Forms" ? renderForms() : renderProfiles()}
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

  sectionContainer: {
    backgroundColor: colors.apple.glass70,
    marginHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
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
  headline: {
    marginBottom: 8,
    ...typography(true).h4Med,
    color: colors.apple.black,
  },
  headlineButton: {
    width: 24,
    height: 24,
  },
  subhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  divider: {
    marginHorizontal: 24,
    backgroundColor: colors.apple.lightStroke,
  },

  profileContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 8,
    gap: 4,
  },

  gradientOverlay: {
    display: "flex",
    flex: 1,
  },
  profileCardContainer: {
    width: "49.4%",
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
    direction: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  bottomSpacerLogo: {
    backgroundColor: "transparent",
    width: 102,
    height: 88,
    alignSelf: "center",
  },
  tagline: {
    ...typography(true).body,
    color: colors.apple.secondaryText,
  },
});

export default MyFilesScreen;
