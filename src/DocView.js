import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, Dimensions, View, TextInput, ScrollView } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { colors } from "../css/globals"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function DocumentView() {
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
        bounces={false} // Prevents overscrolling horizontally
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={styles.innerScrollView}
          bounces={false} // Prevents overscrolling vertically
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          maximumZoomScale={1.5} // Controls max zoom scale
          minimumZoomScale={1} // Controls min zoom scale
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
                  id="Contract_Number"
                />
                <TextInput
                  style={[styles.textInput, { top: 268, left: 79, width: 62, height: 18 }]}
                  id="Member_ID"
                />
                <TextInput
                  style={[styles.textInput, { top: 268, left: 139, width: 152, height: 18 }]}
                  id="Sponsor"
                />
                <TextInput
                  style={[styles.textInput, { top: 285, left: 19, width: 108, height: 18 }]}
                  id="Your_Last_Name"
                />
                <TextInput
                  style={[styles.textInput, { top: 285, left: 126, width: 109, height: 18 }]}
                  id="Your_First_Name"
                />
                <TextInput
                  style={[styles.textInput, { top: 285, left: 262, width: 56, height: 18 }]}
                  id="DOB"
                />
                <TextInput
                  style={[styles.textInput, { top: 285, left: 318, width: 56, height: 18 }]}
                  id="Phone_Number"
                />
                <TextInput
                  style={[styles.textInput, { top: 302, left: 19, width: 133, height: 18 }]}
                  id="Your_Address"
                />
                <TextInput
                  style={[styles.textInput, { top: 302, left: 151, width: 45, height: 18 }]}
                  placeholder="Apt_Suite"
                />
                <TextInput
                  style={[styles.textInput, { top: 302, left: 195, width: 90, height: 18 }]}
                  placeholder="City"
                />
                <TextInput
                  style={[styles.textInput, { top: 302, left: 285, width: 33, height: 18 }]}
                  placeholder="Province"
                />
                <TextInput
                  style={[styles.textInput, { top: 302, left: 317, width: 57, height: 18 }]}
                  placeholder="Postal_Code"
                />
              </ImageBackground>
            )}
            {currentPage === 2 && (
              <ImageBackground
                source={require('../assets/files/insurance2.png')}
                style={styles.imageBackground}
                resizeMode="contain"
              >
                <Input
                  style={[styles.input, { top: 100, left: 20, width: 150 }]}
                  size="small"
                  placeholder="Member's Signature"
                />
                <Input
                  style={[styles.input, { top: 150, left: 20, width: 150 }]}
                  size="small"
                  placeholder="Date"
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
    paddingVertical: 10, // Controls vertical padding to avoid scrolling too far
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
  input: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "black",
    fontSize: 12,
    borderWidth: 1,
  },
  textInput: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: colors.other.tan,
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
