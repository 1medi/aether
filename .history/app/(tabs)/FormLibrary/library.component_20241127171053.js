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
  const [imageUri, setImageUri] = useState(null); // State to hold the image URI
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);




  const ArrowIcon = (props) => (
    <Icon
      name="arrow-forward-outline"
      {...props}
      style={{ width: 25, height: 20, tint: "white" }}
    />
  );

  const BackIcon = (props) => (
    <Icon
      name="arrow-circle-left-outline"
      {...props}
      style={{ width: 30, height: 30, tint: "white" }}
    />
  );

  const handleAutofill = () => {
    setVisible(true);
  };

  const dropdownData = [
    {
      label: "Chris Topher",
      value: {
        Contract_Number: "123456",
        Member_ID: "789012",
        Sponsor: "ABC Corp",
        Your_Last_Name: "Doe",
        Your_First_Name: "John",
        DOB: "1990-01-01",
        Phone_Number: "123-456-7890",
        Your_Address: "123 Main St",
        Apt_Suite: "101",
        City: "Toronto",
        Province: "ON",
        Postal_Code: "A1B 2C3",
        Spouse_Last_Name: "Doe",
        Spouse_First_Name: "Jane",
        Spouse_DOB: "1990-05-01",
        Spouse_Specification: "Dependent",
        Spouse_Contract_Number: "654321",
        Spouse_Member_ID: "987654",
        Signature_Date: "2024-11-27",
      },
    },
    {
      label: "Sarah O'Neil",
      value: {
        Contract_Number: "789456",
        Member_ID: "123987",
        Sponsor: "XYZ Inc",
        Your_Last_Name: "O'Neil",
        Your_First_Name: "Sarah",
        DOB: "1985-07-15",
        Phone_Number: "987-654-3210",
        Your_Address: "456 Elm St",
        Apt_Suite: "202",
        City: "Vancouver",
        Province: "BC",
        Postal_Code: "V6B 2C3",
        Spouse_Last_Name: "Smith",
        Spouse_First_Name: "John",
        Spouse_DOB: "1983-08-25",
        Spouse_Specification: "Dependent",
        Spouse_Contract_Number: "456789",
        Spouse_Member_ID: "321654",
        Signature_Date: "2024-11-27",
      },
    },
    {
      label: "Pat Rick",
      value: {
        Contract_Number: "654987",
        Member_ID: "321789",
        Sponsor: "DEF Ltd",
        Your_Last_Name: "Rick",
        Your_First_Name: "Pat",
        DOB: "1975-12-25",
        Phone_Number: "555-666-7777",
        Your_Address: "789 Oak St",
        Apt_Suite: "303",
        City: "Montreal",
        Province: "QC",
        Postal_Code: "H1A 2B3",
        Spouse_Last_Name: "Rick",
        Spouse_First_Name: "Sam",
        Spouse_DOB: "1978-05-30",
        Spouse_Specification: "Dependent",
        Spouse_Contract_Number: "789123",
        Spouse_Member_ID: "654987",
        Signature_Date: "2024-11-27",
      },
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
  
    // Find the selected profile
    const selectedProfile = dropdownData.find((item) => item.label === value);
  
    if (selectedProfile) {
      setFormData((prevState) => ({
        ...prevState,
        ...selectedProfile.value, // Merge selected profile values into formData
      }));
      setVisible(false); // Close the modal
      console.log("Form updated with:", selectedProfile.value); // Debug log
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
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropdownData}
            search
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="Select Profile"
            searchPlaceholder="Search..."
            value={value}
            onChange={handleDropdownChange}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
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
