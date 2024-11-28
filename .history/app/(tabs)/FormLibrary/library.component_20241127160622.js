import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import userData from '../assets/user_data.json'; // Import JSON data

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

  // Use JSON data
  const dropdownData = userData;

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
        ...selectedProfile.value, // Merge selected profile values into formData
      }));
      setVisible(false); // Close the modal
      alert("Form has been autofilled!");
    } else {
      alert("No matching profile found!");
    }
  };

  return (
    <View>
      <Dropdown
        data={dropdownData}
        labelField="label"
        valueField="label"
        placeholder="Select Profile"
        value={value}
        onChange={handleDropdownChange}
      />
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Autofill</Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View>
          <Text>Would you like to autofill the form with your data?</Text>
          <TouchableOpacity onPress={confirmAutofill}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
