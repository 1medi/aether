import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button, Layout } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";
import Header from "@/components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const ScanDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const analyzeAndParaphrase = async () => {
    if (!imageUri) {
      alert("Please take a photo first!");
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
      let paraphrasedContent = "";

      for (const chunk of chunks) {
        const paraphraseResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
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

        paraphrasedContent +=
          paraphraseResponse.data.choices[0].message.content + "\n\n";
      }

      setParaphrasedText(paraphrasedContent.trim());
      setModalVisible(true);
    } catch (error) {
      console.error("Error during analysis or paraphrasing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <Header title={"Scan A File"} />
      <Layout style={styles.buttonContainer}>
        <Text style={styles.greetingMessage}>
          Scan a document to detect text and paraphrase it.
        </Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <Button onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </Button>
        {imageUri && (
          <Button onPress={analyzeAndParaphrase} style={styles.analyzeButton}>
            <Text style={styles.buttonText}>Analyze & Paraphrase</Text>
          </Button>
        )}
        <Button
          onPress={() => navigation.navigate("Upload")}
          style={[styles.button, styles.switchButton]}
        >
          <Text style={styles.buttonText}>Switch to Upload</Text>
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
                {paraphrasedText || "No paraphrased text available."}
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

export default ScanDocScreen;

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
  },
  greetingMessage: {
    ...typography(true).h1Med,
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    margin: "auto",
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
    padding: 30,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.light.deepBlue80,
    padding: 10,
    borderRadius: 10,
  },
});
