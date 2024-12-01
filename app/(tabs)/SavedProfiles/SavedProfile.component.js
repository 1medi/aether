import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Layout, Button, Icon, Divider } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography } from "@/css/globals";
import { useDarkMode } from "../context/DarkModeContext";
import { Dropdown } from "react-native-element-dropdown";

export default function SavedProfile({ route, navigation }) {
  const { isDarkMode } = useDarkMode();
  const { profile } = route.params;

  const [personalInfo, setPersonalInfo] = useState(profile.personalInfo);
  const [address, setAddress] = useState(profile.address);
  const [emergencyContact, setEmergencyContact] = useState(
    profile.emergencyContact
  );
  const [cityOptions, setCityOptions] = useState([]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-binary", value: "non-binary" },
    { label: "Prefer not to say", value: "prefer-not-to-say" },
  ];

  const provinceOptions = [
    { label: "Ontario", value: "ontario" },
    { label: "Quebec", value: "quebec" },
    { label: "British Columbia", value: "british-columbia" },
    { label: "Alberta", value: "alberta" },
    { label: "Nova Scotia", value: "nova-scotia" },
    { label: "New Brunswick", value: "new-brunswick" },
    { label: "Manitoba", value: "manitoba" },
    { label: "Saskatchewan", value: "saskatchewan" },
    { label: "Prince Edward Island", value: "prince-edward-island" },
    { label: "Newfoundland and Labrador", value: "newfoundland-and-labrador" },
  ];

  const citiesByProvince = {
    ontario: [
      { label: "Toronto", value: "toronto" },
      { label: "Ottawa", value: "ottawa" },
      { label: "Mississauga", value: "mississauga" },
      { label: "Brampton", value: "brampton" },
      { label: "Hamilton", value: "hamilton" },
      { label: "London", value: "london" },
      { label: "Markham", value: "markham" },
      { label: "Vaughan", value: "vaughan" },
      { label: "Kitchener", value: "kitchener" },
      { label: "Windsor", value: "windsor" },
    ],
    quebec: [
      { label: "Montreal", value: "montreal" },
      { label: "Quebec City", value: "quebec-city" },
      { label: "Laval", value: "laval" },
      { label: "Gatineau", value: "gatineau" },
      { label: "Longueuil", value: "longueuil" },
      { label: "Sherbrooke", value: "sherbrooke" },
      { label: "Trois-Rivières", value: "trois-rivieres" },
      { label: "Terrebonne", value: "terrebonne" },
      { label: "Saint-Jean-sur-Richelieu", value: "saint-jean-sur-richelieu" },
      { label: "Chicoutimi", value: "chicoutimi" },
    ],
    "british-columbia": [
      { label: "Vancouver", value: "vancouver" },
      { label: "Victoria", value: "victoria" },
      { label: "Surrey", value: "surrey" },
      { label: "Burnaby", value: "burnaby" },
      { label: "Kelowna", value: "kelowna" },
      { label: "Richmond", value: "richmond" },
      { label: "Abbotsford", value: "abbotsford" },
      { label: "Coquitlam", value: "coquitlam" },
      { label: "Langley", value: "langley" },
      { label: "Nanaimo", value: "nanaimo" },
    ],
    alberta: [
      { label: "Calgary", value: "calgary" },
      { label: "Edmonton", value: "edmonton" },
      { label: "Red Deer", value: "red-deer" },
      { label: "Lethbridge", value: "lethbridge" },
      { label: "St. Albert", value: "st-albert" },
      { label: "Sherwood Park", value: "sherwood-park" },
      { label: "Medicine Hat", value: "medicine-hat" },
      { label: "Grande Prairie", value: "grande-prairie" },
      { label: "Airdrie", value: "airdrie" },
      { label: "Fort McMurray", value: "fort-mcmurray" },
    ],
    "nova-scotia": [
      { label: "Halifax", value: "halifax" },
      { label: "Sydney", value: "sydney" },
      { label: "Dartmouth", value: "dartmouth" },
      { label: "Truro", value: "truro" },
      { label: "New Glasgow", value: "new-glasgow" },
    ],
    "new-brunswick": [
      { label: "Fredericton", value: "fredericton" },
      { label: "Moncton", value: "moncton" },
      { label: "Saint John", value: "saint-john" },
      { label: "Miramichi", value: "miramichi" },
    ],
    manitoba: [
      { label: "Winnipeg", value: "winnipeg" },
      { label: "Brandon", value: "brandon" },
      { label: "Steinbach", value: "steinbach" },
      { label: "Thompson", value: "thompson" },
    ],
    saskatchewan: [
      { label: "Saskatoon", value: "saskatoon" },
      { label: "Regina", value: "regina" },
      { label: "Prince Albert", value: "prince-albert" },
      { label: "Moose Jaw", value: "moose-jaw" },
    ],
    "prince-edward-island": [
      { label: "Charlottetown", value: "charlottetown" },
      { label: "Summerside", value: "summerside" },
    ],
    "newfoundland-and-labrador": [
      { label: "St. John's", value: "st-johns" },
      { label: "Corner Brook", value: "corner-brook" },
      { label: "Gander", value: "gander" },
      { label: "Mount Pearl", value: "mount-pearl" },
    ],
  };

  useEffect(() => {
    if (address.province) {
      setCityOptions(citiesByProvince[address.province] || []);
      setAddress(prevAddress => ({ ...prevAddress, city: "Select a city" }));
    }
  }, [address.province]);

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

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ["transparent", colors.dark.black] // Smooth dark gradient
            : [colors.apple.offWhite, "#D8ECFF"] // Smooth light gradient
        }
        style={styles.bgGradient}
        start={{ x: 0.5, y: 0.75 }} // Adjust the starting point
        end={{ x: 0.5, y: 1 }} // Adjust the ending point
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("MyFiles")}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Picture and Name */}
          <View style={styles.profileHeader}>
            <Image source={personalInfo.image} style={styles.profileImage} />
            <TextInput
              style={styles.profileName}
              value={personalInfo.fullName}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, fullName: text })
              }
            />
            <TextInput
              style={styles.profileRole}
              value={personalInfo.relationshipToUser}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, relationshipToUser: text })
              }
            />
          </View>

          {/* Personal Info Section */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Personal Info</Text>
            <View style={styles.infoItem}>
              <View style={styles.leftSide}>
                <TextInput
                  style={styles.infoText}
                  value={personalInfo.fullName}
                  onChangeText={(text) =>
                    setPersonalInfo({ ...personalInfo, fullName: text })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={personalInfo.phoneNumber}
                  onChangeText={(text) =>
                    setPersonalInfo({ ...personalInfo, phoneNumber: text })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={personalInfo.dateOfBirth}
                  onChangeText={(text) =>
                    setPersonalInfo({ ...personalInfo, dateOfBirth: text })
                  }
                />
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
              {/* <View style={styles.leftSide}> */}
              <Dropdown
                style={styles.dropdown}
                data={genderOptions}
                labelField="label"
                valueField="value"
                value={personalInfo.gender}
                placeholder={personalInfo.gender}
                onChange={(item) =>
                  setPersonalInfo({ ...personalInfo, gender: item.value })
                }
                renderRightIcon={() => (
                  <Icon
                    name="arrow-ios-downward-outline"
                    fill={colors.apple.black}
                    width={24}
                    height={24}
                  />
                )}
              />
              {/* </View> */}
              {/* <View style={styles.rightSide}>
                <Icon
                  name="arrow-ios-downward-outline"
                  fill={colors.apple.black}
                  width={24}
                  height={24}
                />
              </View> */}
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <View style={styles.leftSide}>
                <TextInput
                  style={styles.infoText}
                  value={personalInfo.relationshipToUser}
                  onChangeText={(text) =>
                    setPersonalInfo({
                      ...personalInfo,
                      relationshipToUser: text,
                    })
                  }
                />
              </View>
              <View style={styles.rightSide}>
                <Icon
                  name="heart-outline"
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
                <TextInput
                  style={styles.infoText}
                  value={address.streetAddress}
                  onChangeText={(text) =>
                    setAddress({ ...address, streetAddress: text })
                  }
                />
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
              <Dropdown
                style={styles.dropdown}
                data={provinceOptions}
                labelField="label"
                valueField="value"
                value={address.province}
                placeholder={address.province}
                onChange={(item) =>
                  setAddress({ ...address, province: item.value })
                }
                renderRightIcon={() => (
                  <Icon
                    name="arrow-ios-downward-outline"
                    fill={colors.apple.black}
                    width={24}
                    height={24}
                  />
                )}
              />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
            <Dropdown
                  style={styles.dropdown}
                  data={cityOptions}
                  labelField="label"
                  valueField="value"
                  value={address.city}
                  placeholder={address.city}
                  onChange={(item) => setAddress({ ...address, city: item.value })}
                  renderRightIcon={() => (
                    <Icon
                      name="arrow-ios-downward-outline"
                      fill={colors.apple.black}
                      width={24}
                      height={24}
                    />
                  )}
                />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoItem}>
              <View style={styles.leftSide}>
                <TextInput
                  style={styles.infoText}
                  value={address.postalCode}
                  onChangeText={(text) =>
                    setAddress({ ...address, postalCode: text })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={emergencyContact.fullName}
                  onChangeText={(text) =>
                    setEmergencyContact({ ...emergencyContact, fullName: text })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={emergencyContact.phoneNumber}
                  onChangeText={(text) =>
                    setEmergencyContact({
                      ...emergencyContact,
                      phoneNumber: text,
                    })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={emergencyContact.email}
                  onChangeText={(text) =>
                    setEmergencyContact({ ...emergencyContact, email: text })
                  }
                />
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
                <TextInput
                  style={styles.infoText}
                  value={emergencyContact.relationshipToProfile}
                  onChangeText={(text) =>
                    setEmergencyContact({
                      ...emergencyContact,
                      relationshipToProfile: text,
                    })
                  }
                />
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
        </KeyboardAvoidingView>
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
    ...typography(true).h4Med,
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
    color: isDarkMode ? colors.apple.white : "",
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
    height: 52,
    flex: 1,
  },
  infoText: {
    backgroundColor: isDarkMode ? "transparent" : colors.apple.white,
    borderRadius: 100,
    ...typography(true).body,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },

  leftSide: {
    flex: 1,
  },

  dropdown: {
    flex: 1,
  },

  divider: {
    marginHorizontal: 12,
    backgroundColor: isDarkMode
      ? colors.apple.glass20
      : colors.apple.lightStroke,
  },

  deleteSection: {
    backgroundColor: "transparent",
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
