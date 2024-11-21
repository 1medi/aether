import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  Text,
} from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/header/Header";
import DocView from "@/src/DocView";
import { LinearGradient } from "expo-linear-gradient";

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

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

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

  const confirmAutofill = () => {
    const mockData = {
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
    };

    console.log("Setting formData:", mockData);
    setFormData(mockData);
    setVisible(false);
  };

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      />
      <SafeAreaView style={styles.homePage}>
        <Header title={"Form Library"} />
        <Layout
          style={{ backgroundColor: "none", paddingLeft: 20, width: "auto" }}
        >
          <Text style={styles.headerText}>Canadian Pension Plan</Text>

          <View style={styles.buttonsRow}>
            <Pressable>
              <BackIcon onPress={() => navigation.goBack()} />
            </Pressable>

            <View style={styles.buttons}>
              <Pressable
                style={[styles.formButton, { marginLeft: 15 }]}
                onPress={handleAutofill}
              >
                <Layout style={styles.textContainer}>
                  <View style={styles.viewContainer}>
                    <Text style={styles.title}>Autofill</Text>
                    <ArrowIcon />
                  </View>
                </Layout>
              </Pressable>
            </View>
          </View>
        </Layout>

        <Layout style={styles.imageContainer}>
          <DocView formData={formData} setFormData={setFormData} />
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
              Would you like to autofill the form with mock data?
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
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  homePage: {
    flex: 1,
    backgroundColor: "none",
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Inter_400Regular",
    color: "#08415C",
  },
  buttonsRow: {
    backgroundColor: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingTop: 10,
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
});
