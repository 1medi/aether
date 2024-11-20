import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button, Layout } from "@ui-kitten/components";
import { colors } from "@/css/globals";
import { Icon } from "@ui-kitten/components";
import AccountScreen from "@/app/(tabs)/Account/Account.component";
import { DarkModeProvider } from "@/app/(tabs)/context/DarkModeContext";


import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic
} from "@expo-google-fonts/dm-sans";

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [detectedText, setDetectedText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const resetSelection = () => {
    setImageUri(null);
    setDetectedText("");
    setParaphrasedText("");
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

  const analyzeAndParaphrase = async () => {
    try {
      if (!imageUri) {
        alert('Please select an image first!');
        return;
      }

      const googleAPIKey = process.env.EXPO_PUBLIC_GOOGLE_KEY;
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${googleAPIKey}`;
      console.log(googleAPIKey);

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

      let paraphrasedText = await handleParaphrase(detectedText);
      paraphrasedText = paraphrasedText.replace(/;/g, '\n');

      setParaphrasedText(paraphrasedText);
      console.log(paraphrasedText)
      setModalVisible(true);
    } catch (error) {
      console.error('Error during OCR or paraphrasing:', error.response ? error.response.data : error.message);
      alert('Error analyzing image or paraphrasing. Please try again later.');
    }
  };

  const handleParaphrase = async (text) => {
    try {
      const openAIResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a paraphrasing assistant trying to help caretakers understand difficult parts of a form (Think taxes, medical forms, etc).' },
            { role: 'user', content: `Explain only what the document says to a 10 year old in 1 succinct sentence for each subject (3 MAX, do not display unfinished paragraphs): ${text}. STRICTLY format the following text (No markup / use of ** PLEASE), using BOLD for headers, italics for emphasis, and an indentation for each paragraph.
            ` }
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
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

  const FileIcon = (props) => (
    <Icon name="file-text-outline" fill="#FFF" {...props}
      style={{ width: 32, height: 32, marginHorizontal: 5, paddingBottom: 25 }}
    />
  );

  const CameraIcon = (props) => (
    <Icon name="camera-outline" fill="#FFF" {...props}
      style={{ width: 32, height: 32, marginHorizontal: 5, paddingBottom: 25,}}
    />
  );

  const AnalyzeIcon = (props) => (
    <Icon name="arrow-forward-outline" fill="#FFF" {...props}
      style={{ width: 32, height: 32, marginHorizontal: 5, paddingBottom: 25,}}
    />
  );

  const RefreshIcon = (props) => (
    <Icon name="refresh-outline" fill="#FFF" {...props}
      style={{ width: 32, height: 32, marginHorizontal: 5, paddingBottom: 25,}}
    />
  );


  return (
    <View style={styles.container}>
      <DarkModeProvider>
        <AccountScreen />
      </DarkModeProvider>
      <Text style={{fontFamily:"DMSans_500Medium", padding: 20, paddingBottom:30, marginBottom: 30, fontSize: 24, backgroundColor:colors.light.white60, borderRadius: 20 }}>If you need something explained on a form..... We can help with that!</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300, borderRadius: 20, marginBottom: 10 }}
        />
      )}
  
      {imageUri ? (
        <>
          <Button accessoryLeft={AnalyzeIcon} onPress={analyzeAndParaphrase} style={[styles.button, styles.analyzeButton]}>
            <Text style={styles.buttonText}>Analyze & Paraphrase</Text>
          </Button>
          <Button accessoryLeft={RefreshIcon} onPress={resetSelection} style={styles.button}>
            <Text style={styles.buttonText}>Choose Another</Text>
          </Button>
        </>
      ) : (
        <>
          <Button accessoryLeft={FileIcon} onPress={pickImage} style={styles.button}>
            <Text style={styles.mainButtonText}>Choose a File...</Text>
          </Button>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <Text style={{ width: 50, textAlign: 'center', fontSize: 24 ,fontFamily:"DMSans_700Bold_Italic"}}>OR</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          </View>
          <Button accessoryLeft={CameraIcon} onPress={takePhoto} style={styles.button}>
            <Text style={styles.mainButtonText}>Take a Photo of a form...</Text>
          </Button>
        </>
      )}
  
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{fontFamily:"DMSans_700Bold", fontSize: 48, textAlign: "center", color: colors.light.white80}}>Results</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 20, }}>
              <Text style={styles.modalText}>{paraphrasedText || 'No paraphrased text available'}</Text>
              <Layout style={{flex:1, flexDirection: "row", backgroundColor: "none", justifyContent: "space-around"}}>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              </Layout>
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
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 26,
    fontFamily: 'DMSans_700Bold_Italic',
    color: '#2E8BB7',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: '#2a9df4',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginVertical: 15,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  button: {
    backgroundColor: colors.light.deepBlue80,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  analyzeButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.light.bgBlue,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '80%'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "DMSans_500Medium"
  },
  closeButton: {
    backgroundColor: colors.light.red80,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: colors.light.deepBlue,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  ionicon: {
    marginRight: 20
  }
});
