import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from "@ui-kitten/components";

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);
  const [detectedText, setDetectedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
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
      console.error('Error picking Image: ', error);
    }
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
      console.error('Error taking photo: ', error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert('Please select an image first!');
        return;
      }

      const apiKey = "AIzaSyAwq5vykHTTxxLgCn9aJ_AX8kYnPyd6OeY";
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const cleanedBase64ImageData = base64ImageData.replace(/^data:image\/\w+;base64,/, "");

      const requestData = {
        requests: [
          {
            image: {
              content: cleanedBase64ImageData,
            },
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (apiResponse.data.responses[0].fullTextAnnotation) {
        const text = apiResponse.data.responses[0].fullTextAnnotation.text;
        setDetectedText(text);
        setModalVisible(true); // Show the overlay after setting the detected text
        console.log('Detected text:', text)
      }else if (apiResponse.data.responses[0].textAnnotations) {
        const text = apiResponse.data.responses[0].textAnnotations[0].description;
        setDetectedText(text);
      } else {
        alert('No text found in the image.');
      }
    } catch (error) {
      console.error('Error analyzing image: ', error.response ? error.response.data : error.message);
      alert('Error analyzing image. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Cloud VISION API</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300 }}
        />
      )}
        <Button onPress={pickImage} style={styles.text}>Choose an image...</Button>
      <TouchableOpacity
        onPress={takePhoto}
        style={styles.button}
      >
        <Text style={styles.text}>Take a Photo...</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={analyzeImage}
        style={styles.button}
      >
        <Text style={styles.text}>Analyze Image</Text>
      </TouchableOpacity>
        {
          <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.modalText}>{detectedText}</Text>
                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        }
    </View>
  );
}

export default DetectObject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 100,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  outputText: {
    fontSize: 18,
    marginBottom: 10,
    padding: 100
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
    modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    color: '#1e90ff', // A blue color for emphasis
    textAlign: 'justify', // Justify the text for neat alignment
    padding: 10,
    backgroundColor: '#f0f8ff', // Light blue background
    borderRadius: 5,
  },
});
