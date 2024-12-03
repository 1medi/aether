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
} from "react-native";
import { BlurView } from "expo-blur";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/header/Header";
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

  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);

  const dropdownData = UserData; // Use imported JSON data

  const handleAutoFill = () => setVisible(true);
  const handleSimplify = () => setVisible(true);
  const handleDelete = () => setVisible(true);
  const handleExport = () => setVisible(true);

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

  const handleDropdownChange = (item) => {
    setValue(item.label); // Store the selected label
  };

  const confirmAutofill = () => {
    if (!value) {
      alert("Please select a profile from the dropdown first!");
      return;
    }

    const selectedProfile = UserData.find((item) => item.label === value);

    if (selectedProfile) {
      setFormData((prevState) => ({
        ...prevState,
        ...selectedProfile.value,
      }));
      setVisible(false);
      alert("Form has been autofilled!");
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

        <Layout style={{ backgroundColor: "none", margin: 10, width: "auto" }}>
          <Dropdown
            data={dropdownData} // Bind dropdown to imported JSON
            labelField="label"
            valueField="label"
            placeholder="Select Profile"
            value={value}
            onChange={handleDropdownChange}
          />
          <View style={styles.buttonsRow}>
            
          </View>
        </Layout>

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
              style={styles.utilityIconContainer}
              onPress={icon.action}
            >
              {icon.type === "image" ? (
                <Image source={icon.source} style={styles.customIcon} />
              ) : (
                <Icon
                  name={icon.name}
                  style={[
                    styles.utilityIcon,
                    icon.iconColor && { tintColor: icon.iconColor },
                  ]}
                />
              )}
              <Text
                style={[
                  styles.iconLabel,
                  icon.labelColor && { color: icon.labelColor },
                ]}
              >
                {icon.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Would you like to autofill the form with your data?
            </Text>
            <View style={styles.modalButtons}>
              <Button onPress={confirmAutofill} style={styles.modalButton}>
                Yes
              </Button>
              <Button
                onPress={() => setVisible(false)}
                style={styles.modalButton}
                appearance="ghost"
              >
                No
              </Button>
            </View>
          </View>
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

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
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
