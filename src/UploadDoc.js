import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import { colors } from "@/css/globals";

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
    <View style={styles.container}>
      <Text style={styles.title}>Upload an Image</Text>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Button onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose a File...</Text>
      </Button>
    </View>
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
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
