import React, { useState, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, Dimensions, View, TextInput, ScrollView, Modal, Text } from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { colors } from "../css/globals";
import LangRadio from "@/components/molecules/pdfRadios-1/langRadio"
import GenRadio from "@/components/molecules/pdfRadios-1/genderRadio"
import CoverageRadio from "@/components/molecules/pdfRadios-2/coverageRadio"
import CoverageSpouseRadio from "@/components/molecules/pdfRadios-2/coverageSpouseRadio"
import BenefitRadio from "@/components/molecules/pdfRadios-2/benefitRadio"
import CoverageRadio2 from "@/components/molecules/pdfRadios-2/coverageRadio2"
import AdditionalMember from "@/components/molecules/pdfRadios-2/additionalMember"
import EmploymentRadio from "@/components/molecules/pdfRadios-2/employmentRadio"
import StatusRadio from "@/components/molecules/pdfRadios-3/statusRadio"
import { PixelRatio } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDarkMode } from "@/app/(tabs)/context/DarkModeContext";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function DocumentView({ formData, setFormData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const imageContainerRef = useRef(null); // Ref for the container to capture
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = async () => {
    try {
      const targetPixelCount = 1080;
      const pixelRatio = PixelRatio.get();
      const pixels = targetPixelCount / pixelRatio;

      const result = await captureRef(imageContainerRef, {
        result: "tmpfile",
        height: pixels,
        width: pixels,
        quality: 1,
        format: "png",
      });

      console.log("Captured image path:", result);
      setCapturedImage(result); // Save the captured image path
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSave = () => {
    console.log("Form saved!", formData);

    setIsModalVisible(true);
  };

  const { isDarkMode } = useDarkMode();

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={styles.innerScrollView}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          maximumZoomScale={1.75}
          minimumZoomScale={1}
        >
          <View style={styles.imageContainer}>
            {currentPage === 1 && (
              <ImageBackground
                source={require('../assets/files/insurance1.png')}
                style={styles.imageBackground}
                resizeMode="contain"
              >
                <View style={{ top: 0, left: 0 }}>
                  <TextInput
                    style={[styles.textInput, { top: 268, left: 19, width: 62, height: 18 }]}
                    value={formData.Contract_Number}
                    onChangeText={(text) => setFormData({ ...formData, Contract_Number: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 268, left: 79, width: 62, height: 18 }]}
                    value={formData.Member_ID}
                    onChangeText={(text) => setFormData({ ...formData, Member_ID: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 268, left: 139, width: 152, height: 18 }]}
                    value={formData.Sponsor}
                    onChangeText={(text) => setFormData({ ...formData, Sponsor: text })}
                  />
                  <View style={{ position: "absolute", top: 275, left: 273.4 }}>
                    <LangRadio />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 285, left: 19, width: 108, height: 18 }]}
                    value={formData.Your_Last_Name}
                    onChangeText={(text) => setFormData({ ...formData, Your_Last_Name: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 285, left: 126, width: 109, height: 18 }]}
                    value={formData.Your_First_Name}
                    onChangeText={(text) => setFormData({ ...formData, Your_First_Name: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 285, left: 262, width: 56, height: 18 }]}
                    value={formData.DOB}
                    onChangeText={(text) => setFormData({ ...formData, DOB: text })}
                  />
                  <View style={{ position: "absolute", top: 286, left: 227 }}>
                    <GenRadio />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 285, left: 318, width: 56, height: 18 }]}
                    value={formData.Phone_Number}
                    onChangeText={(text) => setFormData({ ...formData, Phone_Number: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 302, left: 19, width: 133, height: 18 }]}
                    value={formData.Your_Address}
                    onChangeText={(text) => setFormData({ ...formData, Your_Address: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 302, left: 151, width: 45, height: 18 }]}
                    value={formData.Apt_Suite}
                    onChangeText={(text) => setFormData({ ...formData, Apt_Suite: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 302, left: 195, width: 90, height: 18 }]}
                    value={formData.City}
                    onChangeText={(text) => setFormData({ ...formData, City: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 302, left: 285, width: 33, height: 18 }]}
                    value={formData.Province}
                    onChangeText={(text) => setFormData({ ...formData, Province: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 302, left: 317, width: 57, height: 18 }]}
                    value={formData.Postal_Code}
                    onChangeText={(text) => setFormData({ ...formData, Postal_Code: text })}
                  />
                </View>

                <View style={{ top: 0, left: 0 }}>
                  <View style={{ position: "absolute", top: 363, left: 133 }}>
                    <BenefitRadio />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 369.8, left: 19, width: 122, height: 18 }]}
                    value={formData.Spouse_Last_Name}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_Last_Name: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 369.8, left: 140, width: 123, height: 18 }]}
                    value={formData.Spouse_First_Name}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_First_Name: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 369.8, left: 262, width: 56, height: 18 }]}
                    value={formData.Spouse_DOB}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_DOB: text })}
                  />
                  <View style={{ position: "absolute", top: 377.8, left: 300 }}>
                    <CoverageRadio />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 387, left: 254, width: 120, height: 17 }]}
                    value={formData.Spouse_Specification}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_Specification: text })}
                  />
                  <View style={{ position: "absolute", top: 388, left: 154 }}>
                    <CoverageSpouseRadio />
                  </View>
                  <View style={{ position: "absolute", top: 410, left: 205 }}>
                    <CoverageRadio2 />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 403, left: 262, width: 56, height: 18 }]}
                    value={formData.Spouse_Contract_Number}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_Contract_Number: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 403, left: 317, width: 57, height: 18 }]}
                    value={formData.Spouse_Member_ID}
                    onChangeText={(text) => setFormData({ ...formData, Spouse_Member_ID: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 420, left: 317, width: 57, height: 18 }]}
                    value={formData.Signature_Date}
                    onChangeText={(text) => setFormData({ ...formData, Signature_Date: text })}
                  />
                  <View style={{ position: "absolute", top: 439, left: 128 }}>
                    <AdditionalMember />
                  </View>
                  <View style={{ position: "absolute", top: 474, left: 203 }}>
                    <CoverageRadio2 />
                  </View>
                  <View style={{ position: "absolute", top: 448, left: 207 }}>
                    <CoverageRadio2 />
                  </View>
                  <View style={{ position: "absolute", top: 454, left: 2 }}>
                    <CoverageRadio />
                  </View>
                  <View style={{ position: "absolute", top: 472, left: 18 }}>
                    <EmploymentRadio />
                  </View>
                  <TextInput
                    style={[styles.textInput, { top: 463, left: 263, width: 56, height: 18 }]}
                    value={formData.Contract_Number_Additional}
                    onChangeText={(text) => setFormData({ ...formData, Contract_Number_Additional: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 463, left: 318, width: 56, height: 18 }]}
                    value={formData.Member_ID_Additional}
                    onChangeText={(text) => setFormData({ ...formData, Member_ID_Additional: text })}
                  />
                </View>

                <View>

                  <View>
                    <TextInput
                      style={[styles.textInput, { top: 518, left: 19, width: 96, height: 15 }]}
                      value={formData.Claim_First_Name}
                      onChangeText={(text) => setFormData({ ...formData, Claim_First_Name: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 518, left: 114, width: 76, height: 15 }]}
                      value={formData.Claim_Last_Name}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Last_Name: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 518, left: 189, width: 46, height: 15 }]}
                      value={formData.Claim_DOB}
                      onChangeText={(text) => setFormData({ ...formData, Claim_DOB: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 518, left: 234, width: 46, height: 15 }]}
                      value={formData.Claim_Relationship}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Relationship: text })}
                    />
                    <View style={{ position: "absolute", top: 518, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 518, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[styles.textInput, { top: 518, left: 318, width: 56, height: 15 }]}
                      value={formData.Claim_Amount}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Amount: text })}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[styles.textInput, { top: 532, left: 19, width: 96, height: 15 }]}
                      value={formData.Claim_First_Name2}
                      onChangeText={(text) => setFormData({ ...formData, Claim_First_Name2: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 532, left: 114, width: 76, height: 15 }]}
                      value={formData.Claim_Last_Name2}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Last_Name2: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 532, left: 189, width: 46, height: 15 }]}
                      value={formData.Claim_DOB2}
                      onChangeText={(text) => setFormData({ ...formData, Claim_DOB2: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 532, left: 234, width: 46, height: 15 }]}
                      value={formData.Claim_Relationship2}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Relationship2: text })}
                    />
                    <View style={{ position: "absolute", top: 532, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 532, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[styles.textInput, { top: 532, left: 318, width: 56, height: 15 }]}
                      value={formData.Claim_Amount2}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Amount2: text })}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[styles.textInput, { top: 546, left: 19, width: 96, height: 15 }]}
                      value={formData.Claim_First_Name3}
                      onChangeText={(text) => setFormData({ ...formData, Claim_First_Name3: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 546, left: 114, width: 76, height: 15 }]}
                      value={formData.Claim_Last_Name3}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Last_Name3: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 546, left: 189, width: 46, height: 15 }]}
                      value={formData.Claim_DOB3}
                      onChangeText={(text) => setFormData({ ...formData, Claim_DOB3: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 546, left: 234, width: 46, height: 15 }]}
                      value={formData.Claim_Relationship3}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Relationship3: text })}
                    />
                    <View style={{ position: "absolute", top: 546, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 546, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[styles.textInput, { top: 546, left: 318, width: 56, height: 15 }]}
                      value={formData.Claim_Amount3}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Amount3: text })}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[styles.textInput, { top: 560, left: 19, width: 96, height: 15 }]}
                      value={formData.Claim_First_Name4}
                      onChangeText={(text) => setFormData({ ...formData, Claim_First_Name4: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 560, left: 114, width: 76, height: 15 }]}
                      value={formData.Claim_Last_Name4}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Last_Name4: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 560, left: 189, width: 46, height: 15 }]}
                      value={formData.Claim_DOB4}
                      onChangeText={(text) => setFormData({ ...formData, Claim_DOB4: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 560, left: 234, width: 46, height: 15 }]}
                      value={formData.Claim_Relationship4}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Relationship4: text })}
                    />
                    <View style={{ position: "absolute", top: 560, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 560, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[styles.textInput, { top: 560, left: 318, width: 56, height: 15 }]}
                      value={formData.Claim_Amount4}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Amount4: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 574, left: 318, width: 56, height: 15 }]}
                      value={formData.Total_Claim}
                      onChangeText={(text) => setFormData({ ...formData, Total_Claim: text })}
                    />
                  </View>

                  <View>
                    <View style={{ position: "absolute", top: 593, left: 143 }}>
                      <AdditionalMember />
                    </View>
                    <TextInput
                      style={[styles.textInput, { top: 594, left: 231, width: 58, height: 15 }]}
                      value={formData.Claim_Date}
                      onChangeText={(text) => setFormData({ ...formData, Claim_Date: text })}
                    />
                    <TextInput
                      style={[styles.textInput, { top: 594, left: 288, width: 86, height: 15 }]}
                      value={formData.Itnl_Expense}
                      onChangeText={(text) => setFormData({ ...formData, Itnl_Expense: text })}
                    />
                    <View style={{ position: "absolute", top: 621, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 627, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 636, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 643, left: 268 }}>
                      <AdditionalMember />
                    </View>
                  </View>
                </View>
              </ImageBackground>

            )}
            {currentPage === 2 && (
              <ImageBackground
                source={require('../assets/files/insurance2.png')}
                style={styles.imageBackground}
                resizeMode="contain"
              >

                <View style={{ top: 0, left: 0 }}>
                  <TextInput
                    style={[styles.textInput, { top: 389, left: 20, width: 279, height: 18 }]}
                    value={formData.Signature}
                    onChangeText={(text) => setFormData({ ...formData, SomeFieldOnPage2: text })}
                  />
                  <TextInput
                    style={[styles.textInput, { top: 389, left: 298, width: 75, height: 18 }]}
                    value={formData.Signature_Date}
                    onChangeText={(text) => setFormData({ ...formData, SomeFieldOnPage2: text })}
                  />
                </View>
              </ImageBackground>
            )}
          </View>
        </ScrollView>
      </ScrollView>

      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>File saved successfully!</Text>
            <Layout style={styles.modalButtonContainer}>
            <Button
              style={styles.modalButton}
              appearance="ghost"
              onPress={() => setIsModalVisible(false)}
              accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
            >
              Close
            </Button>
            <Button
              style={styles.modalButton}
              appearance="ghost"
              onPress={() => setIsModalVisible(false)}
              accessoryLeft={(props) => <Icon {...props} name="file-outline" />}
            >
              Form Library
            </Button>
            </Layout>
          </View>
        </View>
      </Modal>

      <Layout style={styles.buttonContainer}>
        <Button
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={currentPage === 2 ? handleSave : handleNextPage}
          style={styles.button}
        >
          {currentPage === 2 ? "Save" : "Next"}
        </Button>
      </Layout>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode) => ({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark.black : colors.apple.white,
  },
  innerScrollView: {
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth,
    height: screenHeight,
  },
  textInput: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: isDarkMode ? colors.apple.white : colors.dark.black,
    fontSize: 7,
    padding: 5,
    borderWidth: 1,
    color: isDarkMode ? colors.apple.white : colors.dark.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor:  isDarkMode ? colors.dark.black : '',
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor:  isDarkMode ? colors.dark.black : '',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: isDarkMode ? colors.dark.darkGrey60 : colors.apple.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: isDarkMode ? colors.apple.white : colors.dark.black,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: isDarkMode ? colors.dark.black : '',
    colors: isDarkMode ? colors.apple.white : colors.apple.black,
  },
});
