import React, { useState } from "react";
import { SafeAreaView, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Layout } from "@ui-kitten/components";
import Header from "@/components/header/Header";
import {colors, typography} from '@/css/globals'


const UploadDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
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
      console.error("Error picking Image: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <Header title={"Upload A File"}/>
      <Layout style={styles.buttonContainer}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Button onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose a File...</Text>
      </Button>
      {/* Button to switch to ScanDocScreen */}
      <Text style={styles.buttonLayoutText}>OR</Text>
      <Button
        onPress={() => navigation.navigate("Scan")}
        style={[styles.button, styles.switchButton]}
      >
        <Text style={styles.buttonText}>Switch to Scan</Text>
      </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default UploadDocScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    ...typography(true).display,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
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
    textAlign:"center"
  },
  buttonLayoutText:{
    textAlign:"center"
  }
});
