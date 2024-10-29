import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from "@ui-kitten/components";
import { OPENAI_API_KEY } from '@env';
import { GOOGLE_API_KEY } from '@env';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);
  const [detectedText, setDetectedText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

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

  const extractFieldLabels = (text) => {
    const cleanedText = text.replace(/\s+/g, ' ').trim(); 
    const lines = cleanedText.split(/\n/);  

    const fieldLabels = [];


    const fieldPatterns = [
      /Full Name/i,
      /Place Birth/i,
      /Birth of Date/i,
      /Full Address/i,
      /Nationality/i,
      /City\/Country/i,
      /Gander/i, // Assumed typo for Gender
      /Email/i,
      /Phone Number/i,
    ];


    lines.forEach(line => {
      fieldPatterns.forEach(pattern => {
        if (pattern.test(line)) {
          fieldLabels.push(line.match(pattern)[0]); 
        }
      });
    });

    return fieldLabels; 
  };

  const analyzeAndParaphrase = async () => {
    try {
      if (!imageUri) {
        alert('Please select an image first!');
        return;
      }

      const apiKey = GOOGLE_API_KEY;
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      console.log(apiKey);

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

      let detectedText = '';
      if (apiResponse.data.responses[0].fullTextAnnotation) {
        detectedText = apiResponse.data.responses[0].fullTextAnnotation.text;
        console.log('Detected text:', detectedText);
      } else if (apiResponse.data.responses[0].textAnnotations) {
        detectedText = apiResponse.data.responses[0].textAnnotations[0].description;
        console.log('Detected text:', detectedText);
      } else {
        alert('No text found in the image.');
        return;
      }

      const extractedLabels = extractFieldLabels(detectedText);
      console.log('Extracted labels:', extractedLabels);

      let paraphrasedText = await handleParaphrase(extractedLabels.join(', '));

      paraphrasedText = paraphrasedText.replace(/;/g, '\n');

      setParaphrasedText(paraphrasedText);
      setModalVisible(true);
    } catch (error) {
      console.error('Error during OCR or paraphrasing:', error.response ? error.response.data : error.message);
      alert('Error analyzing image or paraphrasing. Please try again later.');
    }
  };

  const handleParaphrase = async (labels) => {
    try {
      const openAIResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a paraphrasing assistant.' },
            { role: 'user', content: `In a few words and in a numbered format, explain the following personal information labels: ${labels}` }
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );



      return openAIResponse.data.choices[0].message.content;
    } catch (error) {
      console.error('Error paraphrasing text:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  console.log(OPENAI_API_KEY)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload or Capture your Form</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300, borderRadius: 20 }}
        />
      )}
      <Button onPress={pickImage} style={styles.text}>Choose a PDF...</Button>
      <Button onPress={takePhoto} style={styles.text}>Take a Photo of a form...</Button>
      <Button onPress={analyzeAndParaphrase} style={styles.text}>Analyze & Paraphrase</Button>


      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalText}>{paraphrasedText || 'No paraphrased text available'}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetectObject;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 50,
    marginTop: 100,
    fontFamily: 'Inter_800ExtraBold',
    color: '#2E8BB7'
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
    margin: 10
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
});
