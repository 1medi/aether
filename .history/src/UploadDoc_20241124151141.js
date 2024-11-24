import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button, Layout } from "@ui-kitten/components";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import axios from "axios";
import { useDarkMode } from "@/app/(tabs)/context/DarkModeContext";
import { color } from "@rneui/base";
import { ColorSpace } from "react-native-reanimated";


const UploadDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const analyzeAndParaphrase = async () => {
    if (!imageUri) {
      alert("Please upload an image first!");
      return;
    }

    try {
      const googleAPIKey = process.env.EXPO_PUBLIC_GOOGLE_KEY;
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${googleAPIKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const cleanedBase64ImageData = base64ImageData.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const requestData = {
        requests: [
          {
            image: {
              content: cleanedBase64ImageData,
            },
            features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      let detectedText = "";
      if (apiResponse.data.responses[0].fullTextAnnotation) {
        detectedText = apiResponse.data.responses[0].fullTextAnnotation.text;
      } else {
        alert("No text detected in the image.");
        return;
      }

      // Split detected text into smaller chunks if necessary
      const chunks = detectedText.match(/[\s\S]{1,1500}/g) || [];
      let paraphrasedContent = [];

      for (const chunk of chunks) {
        const paraphraseResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `
                  You are a paraphraser for professional use. Rewrite the following content according to these guidelines:
                  
                  1. Summarize and Simplify: Explain only what the document says, as if explaining to a 10-year-old. Provide one succinct sentence for each subject.
                  
                  2. Formatting Rules:
                     - Use **bold** for headers.
                     - Use *italics* for emphasis.
                     - Indent each paragraph.
                     - Avoid any markup or special characters such as "**".
                  
                  Input Content:
                  ${chunk}
                  
                  Return the results in this parsable json form [{"Title":string, "description":string}]
                `,
              },
            ],
            max_tokens: 4096,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const arr = JSON.parse(paraphraseResponse.data.choices[0].message.content);
        paraphrasedContent = [...paraphrasedContent, ...arr];
      }
      console.log(paraphrasedContent);
      setParaphrasedText(paraphrasedContent);
      setModalVisible(true);
    } catch (error) {
      console.error("Error during analysis or paraphrasing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const { isDarkMode } = useDarkMode();

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <Header 
        title={"Upload A File"} 
        isDarkMode={isDarkMode}
      />
      <Layout style={styles.buttonContainer}>
        <Text style={styles.greetingMessage}>
          Upload a document to detect text and paraphrase it.
        </Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <Button onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Choose a File</Text>
        </Button>

        {/* Show Analyze Button Only When Image is Selected */}
        {imageUri && (
          <Button onPress={analyzeAndParaphrase} style={styles.analyzeButton}>
            <Text style={styles.buttonText}>Analyze & Paraphrase</Text>
          </Button>
        )}

        <Button
          onPress={() => navigation.navigate("Scan")}
          style={[styles.button, styles.switchButton]}
        >
          <Text style={styles.buttonText}>Switch to Scan</Text>
        </Button>
      </Layout>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Paraphrased Results</Text>
            <ScrollView style={styles.textContainer}>
              <Text style={styles.modalText}>
                {Array.isArray(paraphrasedText) && paraphrasedText.map((o,i)=><View key={`para_${i}`}>
                  <Text style={{fontWeight:"bold", color: "blue"}}>{o.Title}</Text>
                  <Text>{o.description}</Text>
                </View>)}
              </Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default UploadDocScreen;

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark.black : colors.apple.offWhite,
  },
  buttonContainer: {
    margin: 20,
  },
  greetingMessage: {
    ...typography(true).h1Med,
    fontSize: 24,
    marginBottom: 20,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    margin: "auto"
  },
  button: {
    backgroundColor: colors.light.deepBlue80,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  analyzeButton: {
    backgroundColor: colors.apple.green,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  switchButton: {
    backgroundColor: colors.light.bgBlue,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    height: "100%",
    width: "100vw",
    padding: 30
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.light.deepBlue80,
    padding: 10,
    borderRadius: 10,
  },
});
