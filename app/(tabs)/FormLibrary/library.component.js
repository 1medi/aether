import React, { useState } from "react";
import {
  Pressable,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import SavedProfileCard from "@/components/atoms/SavedProfileCard";
import DocView, {
  handleNextPage,
  handlePreviousPage,
  handleSave,
} from "@/src/DocView";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography } from "@/css/globals";
import { Dropdown } from "react-native-element-dropdown";
import UserData from "./UserData";
import myFormsData from "@/data/MyFormsData";
import savedProfilesData from "@/data/SavedProfilesData";

export default function LibraryScreen({ navigation, isDarkMode }) {
  const [formData, setFormData] = useState({
    Contract_Number: "",
    Member_ID: "",
    Sponsor: "",
    Your_Last_Name: "",
    Your_First_Name: "",
    DOB: "",
    Phone_Number: "",
    Your_Address: "",
    Apt_Suite: "",
    City: "",
    Province: "",
    Postal_Code: "",
  });

  const [filteredData, setFilteredData] = useState(savedProfilesData);
  const [visible, setVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const handleAutoFill = () => setProfileModalVisible(true);
  const handleSimplify = () => setVisible(true);
  const handleDelete = () => setVisible(true);
  const handleExport = () => setVisible(true);

  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (profileModalVisible || confirmationModalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [profileModalVisible, confirmationModalVisible]); // Trigger animation when visibility changes

  // Utility Bar Icons
  const utilityBarIcons = [
    {
      type: "image",
      source: require("@/assets/custom_icons/icon_autoFill.png"),
      label: "Autofill",
      action: handleAutoFill,
    },
    {
      type: "image",
      source: require("@/assets/custom_icons/icon_simplify.png"),
      label: "Simplify",
      action: handleSimplify,
      disabled: true,
    },
    {
      type: "icon",
      name: "external-link-outline",
      label: "Export",
      action: handleExport,
    },
    {
      type: "icon",
      name: "trash-2-outline",
      label: "Delete",
      action: handleDelete,
      iconColor: colors.apple.red,
      labelColor: colors.apple.red,
    },
  ];

  const handleProfileSelect = (profile) => {
    setConfirmationModalVisible(true);
    setSelectedProfile(profile);
  };
  const confirmAutofill = () => {
    if (!selectedProfile) {
      alert("Please select a profile first!");
      return;
    }

    const profileData = UserData.find(
      (item) => item.label === selectedProfile.personalInfo.fullName
    );

    if (profileData) {
      setFormData((prevState) => ({
        ...prevState,
        ...profileData.value,
      }));
      setTimeout(() => {
        setConfirmationModalVisible(false);
        setTimeout(() => {
          setProfileModalVisible(false);
          setTimeout(() => {
            alert("Form has been autofilled!");
          }, 300);
        }, 300);
      }, 600);
    } else {
      alert("No matching profile found!");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyFiles")}
            style={styles.leftIcons}
          >
            <Icon name="arrow-back" style={styles.headerIcon} />
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <Icon name="star-outline" style={styles.headerIcon} />
            <Icon name="checkmark-square-2-outline" style={styles.headerIcon} />
            <Icon name="info-outline" style={styles.headerIcon} />
          </View>
        </View>

        <View style={styles.imageContainer}>
          <DocView formData={formData} setFormData={setFormData} />
        </View>
      </SafeAreaView>

      {/* Utility Bar */}
      <BlurView
        intensity={24}
        tint={isDarkMode ? "dark" : "light"} // Adjust BlurView tint
        style={[
          styles.utilityBarContainer,
          {
            backgroundColor: isDarkMode
              ? colors.apple.black20
              : colors.apple.glass70,
          },
        ]}
      >
        <View style={styles.utilityBar}>
          {utilityBarIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.utilityIconContainer,
                icon.disabled && styles.disabledIconContainer,
              ]}
              onPress={icon.disabled ? null : icon.action}
            >
              {icon.type === "image" ? (
                <Image
                  source={icon.source}
                  style={[
                    styles.customIcon,
                    icon.disabled && styles.disabledIcon,
                  ]}
                />
              ) : (
                <Icon
                  name={icon.name}
                  style={[
                    styles.utilityIcon,
                    icon.iconColor && { tintColor: icon.iconColor },
                    icon.disabled && styles.disabledIcon,
                  ]}
                />
              )}
              <Text
                style={[
                  styles.iconLabel,
                  icon.labelColor && { color: icon.labelColor },
                  icon.disabled && styles.disabledLabel,
                ]}
              >
                {icon.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>

      {/* Profile Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        {/* Animated Blur View with fade-in effect */}
        <Pressable
          style={styles.blurOverlay}
          onPressOut={() => setProfileModalVisible(false)}
        >
          <Animated.View style={[styles.blurOverlay, { opacity: fadeAnim }]}>
            <BlurView intensity={32} tint="dark" style={styles.blurOverlay} />
          </Animated.View>
        </Pressable>
        <View style={styles.profileModalOverlay}>
          <BlurView
            intensity={32}
            tint="light"
            style={styles.profileModalContent}
          >
            <Text style={styles.profileModalText}>
              Select a Profile to Autofill your form with
            </Text>
            <ScrollView>
              <View style={styles.profileContainer}>
                {filteredData.map((profile, index) => (
                  <View
                    key={`${profile.id}-${index}`}
                    style={styles.profileCardContainer}
                  >
                    <SavedProfileCard
                      name={profile.personalInfo.fullName}
                      profile={profile}
                      onPress={() => handleProfileSelect(profile)}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </BlurView>
        </View>
      </Modal>

      {/* Autofill Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        {/* Animated Blur View with fade-in effect */}
        <Pressable
          style={styles.blurOverlay}
          onPressOut={() => setConfirmationModalVisible(false)}
        >
          <Animated.View style={[styles.blurOverlay, { opacity: fadeAnim }]}>
            <BlurView intensity={32} style={styles.blurOverlay} />
          </Animated.View>
        </Pressable>
        <View style={styles.modalOverlay}>
          <BlurView intensity={32} tint="light" style={styles.modalContent}>
            <Text style={styles.modalText}>
              {selectedProfile
                ? `Autofill form with ${selectedProfile.personalInfo.fullName}'s information?`
                : "Autofill form with selected profile's data?"}
            </Text>
            <Text style={styles.modalTextDescription}>
              Make sure to review the form for accuracy.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPressOut={() => setConfirmationModalVisible(false)}
                style={styles.cancelButton}
              >
                <Icon
                  name="close-outline"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: colors.apple.black,
                  }}
                />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startButton}
                onPress={confirmAutofill}
              >
                <Text style={styles.startButtonText}>Autofill</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  topButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
    fill: colors.apple.black,
  },
  leftIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    ...typography(true).h4Med,
    color: colors.apple.black,
  },
  rightIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },

  // Utility Bar Styles
  utilityBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 96,
    backgroundColor: colors.apple.glass70,
    borderTopWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  utilityBar: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 12,
  },
  utilityIconContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 16,
  },
  utilityIcon: {
    width: 24,
    height: 24,
    tintColor: colors.apple.black,
  },
  customIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  iconLabel: {
    ...typography(true).footnote,
    color: colors.apple.black,
    marginTop: 2,
  },
  disabledIconContainer: {
    opacity: 0.2,
  },

  buttonsRow: {
    backgroundColor: "none",
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formButton: {
    borderRadius: 12,
    borderColor: "transparent",
    backgroundColor: "#8EAACD",
    width: 80,
    height: 30,
    marginBottom: 13,
    overflow: "hidden",
    alignContent: "center",
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    backgroundColor: "none",
  },

  viewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
  },
  title: {
    fontSize: 10,
    width: 50,
    fontWeight: "bold",
    color: "#08415C",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 575,
  },

  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: colors.apple.black05,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  // Profile Modal
  profileModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  profileModalContent: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    width: "100%",
    // padding: 12,
    paddingTop: 24,
    backgroundColor: colors.apple.glass70,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // alignItems: "center",
    overflow: "hidden",
  },
  profileModalText: {
    ...typography(true).h2Med,
    marginBottom: 24,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  profileContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
  },
  profileCardContainer: {
    width: "50%",
  },

  // Autofill Confirmation Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    // padding: 16,
    minHeight: 208,
    backgroundColor: colors.apple.glass70,
    borderRadius: 16,
    // alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  modalText: {
    ...typography(true).h2Med,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  modalTextDescription: {
    ...typography(true).body,
    paddingHorizontal: 16,
    color: colors.apple.secondaryText,
    textAlign: "center",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },

  // Modal Actions
  modalActions: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: 1,
    borderColor: colors.apple.hardStroke,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    flexDirection: "row",
    gap: 8,
    borderRightWidth: 1,
    borderColor: colors.apple.hardStroke,
  },
  startButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  buttonText: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
    textAlign: "center",
  },
  startButtonText: {
    ...typography(true).bodyBold,
    color: colors.light.blue,
    textAlign: "center",
  },

  dontShowAgainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  dontShowAgainIcon: {
    width: 24,
    height: 24,
    fill: colors.apple.black,
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
