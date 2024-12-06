import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { colors } from "../css/globals";
import LangRadio from "@/components/molecules/pdfRadios-1/langRadio";
import GenRadio from "@/components/molecules/pdfRadios-1/genderRadio";
import CoverageRadio from "@/components/molecules/pdfRadios-2/coverageRadio";
import CoverageSpouseRadio from "@/components/molecules/pdfRadios-2/coverageSpouseRadio";
import BenefitRadio from "@/components/molecules/pdfRadios-2/benefitRadio";
import CoverageRadio2 from "@/components/molecules/pdfRadios-2/coverageRadio2";
import AdditionalMember from "@/components/molecules/pdfRadios-2/additionalMember";
import EmploymentRadio from "@/components/molecules/pdfRadios-2/employmentRadio";
import StatusRadio from "@/components/molecules/pdfRadios-3/statusRadio";
import { captureRef } from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function DocumentView({ formData, setFormData, }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const viewToSnapshotRef = useRef();
  const sigref = useRef();
  const [snapshotImg, setSnapshotImg] = useState();

  const navigation = useNavigation();

  const handleNavigation = () => {
    setIsModalVisible(false);
    navigation.navigate("MyFiles");
  };
  return (
    <View style={{}}>
      <SafeAreaView
        ref={viewToSnapshotRef}
        collapsable={false}
        style={styles.container}
        >
        <ScrollView
          horizontal
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
            <ScrollView contentContainerStyle={styles.imageContainer}>
              <ImageBackground
                source={require("../assets/files/insurance1.png")}
                style={styles.imageBackground}
                resizeMode="contain"
              >
                <View style={{ top: 0, left: 0 }}>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 118, left: 19, width: 61.5, height: 17 },
                    ]}
                    value={formData.Contract_Number}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Contract_Number: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 118, left: 80, width: 61, height: 17 },
                    ]}
                    value={formData.Member_ID}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Member_ID: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 118, left: 140.5, width: 151, height: 17 },
                    ]}
                    value={formData.Sponsor}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Sponsor: text })
                    }
                  />
                  <View style={{ position: "absolute", top: 124, left: 273.4 }}>
                    <LangRadio />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 134.5, left: 19, width: 108.5, height: 17 },
                    ]}
                    value={formData.Your_Last_Name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Your_Last_Name: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 134.5, left: 127, width: 108, height: 17 },
                    ]}
                    value={formData.Your_First_Name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Your_First_Name: text })
                    }
                  />
                  <View style={{ position: "absolute", top: 134.5, left: 227 }}>
                    <GenRadio />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 134.5, left: 262, width: 56, height: 17 },
                    ]}
                    value={formData.DOB}
                    onChangeText={(text) =>
                      setFormData({ ...formData, DOB: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 134.5, left: 317.5, width: 56.5, height: 17 },
                    ]}
                    value={formData.Phone_Number}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Phone_Number: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 151, left: 19, width: 133, height: 17.5 },
                    ]}
                    value={formData.Your_Address}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Your_Address: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 151, left: 151.5, width: 45, height: 17.5 },
                    ]}
                    value={formData.Apt_Suite}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Apt_Suite: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 151, left: 196, width: 89, height: 17.5 },
                    ]}
                    value={formData.City}
                    onChangeText={(text) =>
                      setFormData({ ...formData, City: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 151, left: 284.5, width: 33.5, height: 17.5 },
                    ]}
                    value={formData.Province}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Province: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 151, left: 317, width: 57, height: 17.5 },
                    ]}
                    value={formData.Postal_Code}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Postal_Code: text })
                    }
                  />
                </View>

                <View style={{ top: 0, left: 0 }}>
                  <View style={{ position: "absolute", top: 212, left: 133 }}>
                    <BenefitRadio />
                  </View>

                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 219, left: 19, width: 122, height: 17 },
                    ]}
                    value={formData.Spouse_Last_Name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Spouse_Last_Name: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 219, left: 140.5, width: 122.5, height: 17 },
                    ]}
                    value={formData.Spouse_First_Name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Spouse_First_Name: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 219, left: 262.5, width: 55.5, height: 17 },
                    ]}
                    value={formData.Spouse_DOB}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Spouse_DOB: text })
                    }
                  />
                  <View style={{ position: "absolute", top: 226, left: 300 }}>
                    <CoverageRadio />
                  </View>
                  <View style={{ position: "absolute", top: 236, left: 154 }}>
                    <CoverageSpouseRadio />
                  </View>
                  <View style={{ position: "absolute", top: 260, left: 205 }}>
                    <CoverageRadio2 />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 296, left: 305, width: 69, height: 17 },
                    ]}
                    value={formData.Spouse_Specification}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Spouse_Specification: text })
                    }
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 252, left: 262, width: 56, height: 18 },
                    ]}
                    value={formData.Spouse_Contract_Number}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        Spouse_Contract_Number: text,
                      })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 252, left: 317, width: 57, height: 18 },
                    ]}
                    value={formData.Spouse_Member_ID}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Spouse_Member_ID: text })
                    }
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 269, left: 317, width: 57, height: 17 },
                    ]}
                    value={formData.Signature_Date}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Signature_Date: text })
                    }
                  />
                  <View style={{ position: "absolute", top: 288, left: 128 }}>
                    <AdditionalMember />
                  </View>
                  <View style={{ position: "absolute", top: 297, left: 207 }}>
                    <CoverageRadio2 />
                  </View>
                  <View style={{ position: "absolute", top: 322, left: 203 }}>
                    <CoverageRadio2 />
                  </View>
                  <View style={{ position: "absolute", top: 303, left: 2 }}>
                    <CoverageRadio />
                  </View>
                  <View style={{ position: "absolute", top: 321, left: 18 }}>
                    <EmploymentRadio />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 312, left: 263, width: 56, height: 18 },
                    ]}
                    value={formData.Contract_Number_Additional}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        Contract_Number_Additional: text,
                      })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 312, left: 318, width: 56, height: 18 },
                    ]}
                    value={formData.Member_ID_Additional}
                    onChangeText={(text) =>
                      setFormData({ ...formData, Member_ID_Additional: text })
                    }
                  />
                </View>

                <View>
                  <View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 340, left: 19, width: 96, height: 15 },
                      ]}
                      value={formData.Claim_First_Name}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_First_Name: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 340, left: 115, width: 74, height: 15 },
                      ]}
                      value={formData.Claim_Last_Name}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Last_Name: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 340, left: 189, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_DOB}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_DOB: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 340, left: 234, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_Relationship}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Relationship: text })
                      }
                    />
                    <View style={{ position: "absolute", top: 340, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 340, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 340, left: 318, width: 56, height: 15 },
                      ]}
                      value={formData.Claim_Amount}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Amount: text })
                      }
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 354, left: 19, width: 96, height: 15 },
                      ]}
                      value={formData.Claim_First_Name2}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_First_Name2: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 354, left: 114, width: 75, height: 15 },
                      ]}
                      value={formData.Claim_Last_Name2}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Last_Name2: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 354, left: 189, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_DOB2}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_DOB2: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 354, left: 234, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_Relationship2}
                      onChangeText={(text) =>
                        setFormData({
                          ...formData,
                          Claim_Relationship2: text,
                        })
                      }
                    />
                    <View style={{ position: "absolute", top: 354, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 354, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 354, left: 318, width: 56, height: 15 },
                      ]}
                      value={formData.Claim_Amount2}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Amount2: text })
                      }
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 368, left: 19, width: 96, height: 15 },
                      ]}
                      value={formData.Claim_First_Name3}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_First_Name3: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 368, left: 114, width: 76, height: 15 },
                      ]}
                      value={formData.Claim_Last_Name3}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Last_Name3: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 368, left: 189, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_DOB3}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_DOB3: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 368, left: 234, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_Relationship3}
                      onChangeText={(text) =>
                        setFormData({
                          ...formData,
                          Claim_Relationship3: text,
                        })
                      }
                    />
                    <View style={{ position: "absolute", top: 368, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 368, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 368, left: 318, width: 56, height: 15 },
                      ]}
                      value={formData.Claim_Amount3}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Amount3: text })
                      }
                    />
                  </View>

                  <View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 19, width: 96, height: 15 },
                      ]}
                      value={formData.Claim_First_Name4}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_First_Name4: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 114, width: 76, height: 15 },
                      ]}
                      value={formData.Claim_Last_Name4}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Last_Name4: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 189, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_DOB4}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_DOB4: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 234, width: 46, height: 15 },
                      ]}
                      value={formData.Claim_Relationship4}
                      onChangeText={(text) =>
                        setFormData({
                          ...formData,
                          Claim_Relationship4: text,
                        })
                      }
                    />
                    <View style={{ position: "absolute", top: 382, left: 271 }}>
                      <StatusRadio />
                    </View>
                    <View style={{ position: "absolute", top: 382, left: 291 }}>
                      <StatusRadio />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 318, width: 56, height: 15 },
                      ]}
                      value={formData.Claim_Amount4}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Amount4: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 382, left: 318, width: 56, height: 15 },
                      ]}
                      value={formData.Total_Claim}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Total_Claim: text })
                      }
                    />
                  </View>

                  <View>
                    <View style={{ position: "absolute", top: 415, left: 143 }}>
                      <AdditionalMember />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 416, left: 231, width: 58, height: 15 },
                      ]}
                      value={formData.Claim_Date}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Claim_Date: text })
                      }
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { top: 416, left: 288, width: 86, height: 15 },
                      ]}
                      value={formData.Itnl_Expense}
                      onChangeText={(text) =>
                        setFormData({ ...formData, Itnl_Expense: text })
                      }
                    />
                    <View style={{ position: "absolute", top: 443, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 450, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 458, left: 268 }}>
                      <AdditionalMember />
                    </View>
                    <View style={{ position: "absolute", top: 465, left: 268 }}>
                      <AdditionalMember />
                    </View>
                  </View>
                </View>
              </ImageBackground>

              <ImageBackground
                source={require("../assets/files/insurance2.png")}
                style={styles.imageBackground}
                resizeMode="contain"
              >
                <View style={{ top: 0, left: 0 }}>
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 389, left: 20, width: 279, height: 18 },
                    ]}
                    value={formData.Signature}
                    onChangeText={(text) =>
                      setFormData({ ...formData, SomeFieldOnPage2: text })
                    }
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      { top: 389, left: 298, width: 75, height: 18 },
                    ]}
                    value={formData.Signature_Date}
                    onChangeText={(text) =>
                      setFormData({ ...formData, SomeFieldOnPage2: text })
                    }
                  />
                </View>
              </ImageBackground>
            </ScrollView>
          </ScrollView>
        </ScrollView>



        <Modal transparent visible={isModalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>File saved successfully!</Text>
              {snapshotImg && (
                <Image
                  resizeMode="contain"
                  style={styles.snapshotImg}
                  source={{ uri: snapshotImg }}
                />
              )}
              <Layout style={styles.modalButtonContainer}>
                <Button
                  style={styles.modalButton}
                  appearance="ghost"
                  onPress={() => setIsModalVisible(false)}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="close-outline" />
                  )}
                >
                  Close
                </Button>
                <Button
                  style={styles.modalButton}
                  appearance="ghost"
                  onPress={handleNavigation}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="file-outline" />
                  )}
                >
                  Form Library
                </Button>
              </Layout>
            </View>
          </View>
        </Modal>
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerScrollView: {
    alignItems: "center",
    flexGrow: 1, // Ensures the content stretches to fill the ScrollView
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  imageContainer: {
    width: screenWidth,
    minHeight: 1100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth,
    height: 550,
  },
  textInput: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: colors.dark.black,
    fontSize: 5,
    padding: 5,
    borderWidth: 0.75,
    color: "black",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: colors.dark.black,
    fontSize: 16,
  },
  snapshotImg: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  signatureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signaturePreview: {
    width: 150,
    height: 18,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  placeholderText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#aaa",
  },
  signatureCanvasContainer: {
    height: 100, // Fixed height for canvas
    width: 100, // Adjust width to fit the screen
    borderWidth: 1,
    borderColor: "#ccc",
    margin: "auto",
    marginLeft: 30,
    zIndex: 9999,
  },
  signaturePad: `
    .m-signature-pad {
      box-shadow: none; 
      border: none; 
    }
    .m-signature-pad--body {
      border: 2px solid #ddd;
      border-radius: 10px;
    }
    .m-signature-pad--footer {
      display: none;
    }
  `,
});
