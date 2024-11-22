import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { colors } from "@/css/globals";

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
    <View style={styles.container}>
      <Text style={styles.title}>Scan with Camera</Text>
      <Button onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Take a Photo...</Text>
      </Button>
    </View>
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
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
