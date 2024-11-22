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
import ConsoleScreenTwo from "@/components/atoms/ConsoleScreenTwo";
import ConsoleScreen from "@/components/atoms/ConsoleScreen";
import { useDarkMode } from "../context/DarkModeContext";

export const MyFilesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Forms");
  const [filteredData, setFilteredData] = useState(myFormsData);

  const [showFormsSuggestionBanner, setShowFormsSuggestionBanner] =
    useState(true);
  const [showProfilesSuggestionBanner, setShowProfilesSuggestionBanner] =
    useState(true);

  const TipsIcon = (props) => <Icon name="bulb-outline" {...props} />;
  const CloseIcon = (props) => <Icon name="close-outline" {...props} />;

  const [selectedProfile, setSelectedProfile] = useState(null);

  // Profile state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [dob, setDob] = useState("June 15, 1945");
  const [gender, setGender] = useState("Female");
  const [address, setAddress] = useState("123 Street, Apt 2B");
  const [city, setCity] = useState("Vancouver");
  const [province, setProvince] = useState("British Columbia");
  const [postalCode, setPostalCode] = useState("A1B 2C3");
  const [emergencyContactName, setEmergencyContactName] =
    useState("John O'Neil");
  const [emergencyContactPhone, setEmergencyContactPhone] =
    useState("(321) 654-0987");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState(
    "john.oneil@gmail.com"
  );
  const [relation, setRelation] = useState("Son");

  // Search and tab switch logic
  const onSearch = (query) => {
    const data = activeTab === "Forms" ? myFormsData : savedProfilesData;

    if (!query.trim()) {
      setFilteredData(data);
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

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFilteredData(tab === "Forms" ? myFormsData : savedProfilesData);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setName(profile.name);
    setPhone("(123) 456-7890");
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
              <TouchableOpacity onPress={() => setShowSuggestionBanner(false)}>
                <CloseIcon fill={colors.apple.black} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.suggestionDescription}>
              Tap the "+" button to upload your own forms. Either take a photo
              or upload directly from your device.
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

  const renderProfileDetails = () => (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <TouchableOpacity onPress={() => setSelectedProfile(null)}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Image source={selectedProfile.image} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{selectedProfile.role}</Text>
        <ProfileDetailsSection />
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderProfiles = () => (
    selectedProfile ? (
      renderProfileDetails()
    ) : (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {filteredData.map((profile, index) => (
            <View key={`${profile.id}-${index}`} style={styles.profileCardContainer}>
              <TouchableOpacity onPress={() => handleProfileSelect(profile)}>
                <SavedProfileCard
                  name={profile.name}
                  role={profile.role}
                  image={profile.image}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    )
  );

  const ProfileDetailsSection = () => (
    <>
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
        />
        <TextInput
          style={styles.detailValue}
          value={emergencyContactEmail}
          onChangeText={setEmergencyContactEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.detailValue}
          value={relation}
          onChangeText={setRelation}
          placeholder="Relation"
        />
      </View>
    </>
  );

  const Footer = () => (
    <Layout style={styles.bottomSpacerSection}>
      <Image
        source={require("@/assets/images/logo40.png")}
        style={styles.bottomSpacerLogo}
      />
      <Text style={styles.bottomMessage}>Aether • 2024</Text>
    </Layout>
  );
  console.log(filteredData);
  console.log(navigation);
  return (
    <SafeAreaView style={styles.fullPage}>
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

// Full styles at the bottom in the original format
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
    margin: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  activeToggleButton: {
    borderRadius: 100,
    // backgroundColor: colors.apple.white,
    // borderWidth: 1,
    // borderColor: colors.apple.lightStroke,
    backgroundColor: colors.apple.white,
    borderRadius: 100,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#888",
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

  divider: {
    marginHorizontal: 24,
    backgroundColor: colors.apple.lightStroke,
  },
  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  profileCardContainer: {
    width: "48%",
    marginBottom: 16,
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
  bottomSpacerSection: {
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "none",
  },
  bottomSpacerLogo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  bottomMessage: {
    fontSize: 14,
    color: "#888",
  },
});

export default MyFilesScreen;
