import React, { useState } from "react";
import {
  Pressable,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/header/Header";
import DocView from "@/src/DocView";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography } from "@/css/globals";
import { Dropdown } from "react-native-element-dropdown";
import UserData from './UserData.json'

export default function LibraryScreen() {
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

  const handleDropdownChange = (item) => {
    setValue(item.label); // Store the selected label
  };

  const confirmAutofill = () => {
    if (!value) {
      alert("Please select a profile from the dropdown first!");
      return;
    }

    const selectedProfile = dropdownData.find((item) => item.label === value);

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
        <Layout
          style={{ backgroundColor: "none", margin:10, width: "auto", }}
        >
          <Dropdown
        data={dropdownData} // Bind dropdown to imported JSON
        labelField="label"
        valueField="label"
        placeholder="Select Profile"
        value={value}
        onChange={handleDropdownChange}
      />
          <View style={styles.buttonsRow}>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.formButton, { marginLeft: 15 }]}
                onPress={() => setVisible(true)}
              >
                <View style={styles.viewContainer}>
                  <Text style={styles.title}>Autofill</Text>
                  <ArrowIcon />
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.formButton, { marginLeft: 15 }]}
                onPress={analyzeAndParaphrase}
              >
                  <View style={styles.viewContainer}>
                    <Text style={styles.title}>Analyze</Text>
                    <ArrowIcon />
                  </View>
              </TouchableOpacity>
            </View> */}
          </View>
        </Layout>

        <Layout style={styles.imageContainer}>
          <DocView
            formData={formData}
            setFormData={setFormData}
            onImageReady={setImageUri}
          />
        </Layout>
      </SafeAreaView>

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
    ...typography(true).h3Med,
    color: colors.apple.black,
  },

  rightIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
    width: "100%",
    height: 500,
    alignItems: "center",
    justifyContent: "center",
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
