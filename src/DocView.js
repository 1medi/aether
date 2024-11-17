import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, Dimensions, View, TextInput, ScrollView } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { colors } from "../css/globals";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function DocumentView({ formData, setFormData}) {


  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
          maximumZoomScale={1.5}
          minimumZoomScale={1}
        >
          <View style={styles.imageContainer}>
            {currentPage === 1 && (
              <ImageBackground
                source={require('../assets/files/insurance1.png')}
                style={styles.imageBackground}
                resizeMode="contain"
              >
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
              </ImageBackground>
            )}
          </View>
        </ScrollView>
      </ScrollView>

      <Layout style={styles.buttonContainer}>
        <Button
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={handleNextPage}
          disabled={currentPage === 2}
          style={styles.button}
        >
          Next
        </Button>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderColor: colors.dark.black,
    fontSize: 7,
    padding: 5,
    borderWidth: 1,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
