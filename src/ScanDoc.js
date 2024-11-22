import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Layout } from "@ui-kitten/components";
import { colors } from "@/css/globals";
import Header from "@/components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
const ScanDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.error("Error taking photo: ", error);
    }
  };

  return (
    <SafeAreaView style={[styles.fullPage]} edges={["top", "left", "right"]}>
      <Header title={"Scan A File"}/>
      <Layout style={styles.buttonContainer}>
      <Button onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Take a Photo...</Text>
      </Button>
      <Text style={styles.buttonLayoutText}>OR</Text>
      {/* Button to switch to UploadDocScreen */}
      <Button
        onPress={() => navigation.navigate("Upload")}
        style={[styles.button, styles.switchButton]}
      >
        <Text style={styles.buttonText}>Switch to Upload</Text>
      </Button>
      </Layout>

    </SafeAreaView>
  );
};

export default ScanDocScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.light.deepBlue80,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  switchButton: {
    backgroundColor: colors.apple.green,
    borderWidth: 0
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer:{
    maxWidth: 400,
    margin:"auto",
    backgroundColor: "none",
    textAlign: "center"
  },
  buttonLayoutText:{
    textAlign:"center"
  }
});
