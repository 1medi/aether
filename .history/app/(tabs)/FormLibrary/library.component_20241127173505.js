import React, { useState } from "react";
import { Pressable, View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import profiles from "@/assets/profiles.json"; // Import the JSON file

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

  const dropdownData = profiles; // Use imported JSON data

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
      {/* Your existing JSX */}
      <Dropdown
        data={dropdownData} // Bind dropdown to imported JSON
        labelField="label"
        valueField="label"
        placeholder="Select Profile"
        value={value}
        onChange={handleDropdownChange}
      />
      {/* Modal, buttons, etc. */}
    </>
  );
}
