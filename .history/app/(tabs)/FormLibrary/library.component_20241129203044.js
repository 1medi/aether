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
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import UserData from "./UserData"; // Import updated UserData.js

export default function LibraryScreen() {
  const navigation = useNavigation();
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

  const dropdownData = UserData; // Use the imported UserData.js

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
        <Layout style={{ backgroundColor: "none", margin: 10 }}>
          <Dropdown
            data={dropdownData}
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
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Layout>

        <Layout style={styles.imageContainer}>
          {/* Placeholder for DocView */}
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
