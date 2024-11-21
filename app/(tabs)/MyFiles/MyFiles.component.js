import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import SavedProfileCard from "@/components/atoms/SavedProfileCard";
import Header from "@/components/header/Header";
import myFormsData from "@/data/MyFormsData";
import savedProfilesData from "@/data/SavedProfilesData";

// Main component to display and manage "My Files" screen
export const MyFilesScreen = () => {
  const [activeTab, setActiveTab] = useState("Forms"); // Active tab state: "Forms" or "Profiles"
  const [filteredData, setFilteredData] = useState(myFormsData); // Data filtered based on active tab or search query
  const [selectedProfile, setSelectedProfile] = useState(null); // Tracks the selected profile for details view

  // State for profile details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [dob, setDob] = useState("June 15, 1985");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("123 Street, Apt 2B");
  const [city, setCity] = useState("Vancouver");
  const [province, setProvince] = useState("British Columbia");
  const [postalCode, setPostalCode] = useState("A1B 2C3");
  const [emergencyContactName, setEmergencyContactName] = useState("John Topher");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("(321) 654-0987");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("john.topher@gmail.com");
  const [relation, setRelation] = useState("Son");

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

  // Handles profile selection and updates state with selected profile data
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setName(profile.name);
    setPhone("(123) 456-7890"); // Default or fetched data
    setDob("June 15, 1945");
    setGender("Female");
    setAddress("123 Street, Apt 2B");
    setCity("Vancouver");
    setProvince("British Columbia");
    setPostalCode("A1B 2C3");
    setEmergencyContactName("John O'Neil");
    setEmergencyContactPhone("(321) 654-0987");
    setEmergencyContactEmail("john.oneil@gmail.com");
    setRelation("Son");
  };

  // Renders the forms tab with a list of forms
  const renderForms = () => (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ height: 16 }} />
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

  // Renders the detailed view of a selected profile
  const renderProfileDetails = () => (
    <ScrollView style={styles.scrollContainer}>
      <View>
        {/* Back Button */}
        <TouchableOpacity onPress={() => setSelectedProfile(null)}>
          <Text style={{ fontSize: 18, color: "#000", marginLeft: 16 }}>←</Text>
        </TouchableOpacity>

        {/* Profile Image */}
        <Image source={selectedProfile.image} style={styles.profileImage} />

        {/* Name and Role */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{selectedProfile.role}</Text>

        {/* Personal Information Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Personal Information</Text>
          <TextInput
            style={styles.detailValue}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.detailValue}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.detailValue}
            value={dob}
            onChangeText={setDob}
            placeholder="Date of Birth"
          />
          <TextInput
            style={styles.detailValue}
            value={gender}
            onChangeText={setGender}
            placeholder="Gender"
          />
        </View>

        {/* Address Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Address</Text>
          <TextInput
            style={styles.detailValue}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <TextInput
            style={styles.detailValue}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Postal Code"
          />
          <TextInput
            style={styles.detailValue}
            value={province}
            onChangeText={setProvince}
            placeholder="Province"
          />
          <TextInput
            style={styles.detailValue}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
        </View>

        {/* Emergency Contact Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Emergency Contact</Text>
          <TextInput
            style={styles.detailValue}
            value={emergencyContactName}
            onChangeText={setEmergencyContactName}
            placeholder="Contact Name"
          />
          <TextInput
            style={styles.detailValue}
            value={emergencyContactPhone}
            onChangeText={setEmergencyContactPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.detailValue}
            value={emergencyContactEmail}
            onChangeText={setEmergencyContactEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.detailValue}
            value={relation}
            onChangeText={setRelation}
            placeholder="Relation"
          />
        </View>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Renders the profiles tab with a list of profiles or details of a selected profile
  const renderProfiles = () => (
    selectedProfile ? (
      renderProfileDetails()
    ) : (
      <ScrollView style={styles.scrollContainer}>
        <View style={{ height: 16 }} />
        {/* List of profiles */}
        <View style={styles.profileContainer}>
          {filteredData.map((profile, index) => (
            <View key={`${profile.id}-${index}`} style={styles.profileCardContainer}>
              <TouchableOpacity onPress={() => handleProfileSelect(profile)}>
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
      </ScrollView>
    )
  );

  return (
    <SafeAreaView style={styles.fullPage}>
      {/* Tab Switch */}
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

      {/* Header and Tab Content */}
      <Header
        title="My Files"
        placeholder="Search my forms and profiles"
        hasSearchBar
        onSearch={onSearch}
        noTitle
      />
      {activeTab === "Forms" ? renderForms() : renderProfiles()}
    </SafeAreaView>
  );
};

// Define styles used in the component
const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
  },
  toggleContainer: {
    flexDirection: "row",
    marginVertical: 16,
    alignSelf: "center",
  },
  toggleButton: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  activeToggleButton: {
    backgroundColor: colors.apple.white,
    borderRadius: 100,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#888",
  },
  activeToggleButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
  sectionContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 16,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyFilesScreen;
