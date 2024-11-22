import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProfile({ route, navigation }) {
  const { profile } = route.params;

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
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
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
            <Text style={styles.infoText}>
              Phone: {personalInfo.phoneNumber}
            </Text>
            <Text style={styles.infoText}>DOB: {personalInfo.dateOfBirth}</Text>
            <Text style={styles.infoText}>Gender: {personalInfo.gender}</Text>
          </View>

          {/* Address Section */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Address</Text>
            <Text style={styles.infoText}>Street: {address.streetAddress}</Text>
            <Text style={styles.infoText}>City: {address.city}</Text>
            <Text style={styles.infoText}>Province: {address.province}</Text>
            <Text style={styles.infoText}>
              Postal Code: {address.postalCode}
            </Text>
          </View>

          {/* Emergency Contact Section */}
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Emergency Contact</Text>
            <Text style={styles.infoText}>
              Name: {emergencyContact.fullName}
            </Text>
            <Text style={styles.infoText}>
              Phone: {emergencyContact.phoneNumber}
            </Text>
            <Text style={styles.infoText}>Email: {emergencyContact.email}</Text>
            <Text style={styles.infoText}>
              Relationship: {emergencyContact.relationshipToProfile}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backButtonContainer: {
    marginBottom: 16,
  },
  backButton: {
    fontSize: 18,
    color: "blue",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 18,
    color: "gray",
  },
  category: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});
