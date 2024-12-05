import React, { useState, useMemo, useRef } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
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
import Modal from "react-native-modal";
import { useDarkMode } from "@/app/(tabs)/context/DarkModeContext";
import ScanAnimation from "@/components/atoms/scanAnimation"
import BottomSheetModal from "@/components/molecules/BottomSheetModal"

const ScanDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [loading, setLoading] = useState(false);
  const sheetRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [paraphrases, setParaphrases] = useState([]);


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

  const saveParaphrase = async (inputText, paraphrasedText) => {
    console.log("saveParaphrase called with:", inputText, paraphrasedText); // Debug
  
    try {
      const response = await fetch("https://aether-wnq5.onrender.com/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paraphrasedText: paraphrasedText, // Use the correct variable
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Paraphrase saved successfully:", data);
    } catch (error) {
      console.error("Error in saveParaphrase:", error);
    }
  };

  const analyzeAndParaphrase = async () => {
    if (!imageUri) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

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
        setLoading(false);
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
        const arr = JSON.parse(
          paraphraseResponse.data.choices[0].message.content
        );
        paraphrasedContent = [...paraphrasedContent, ...arr];
      }
      console.log(paraphrasedContent);

      setParaphrasedText(paraphrasedContent);

      // Save the paraphrased content to your backend
      await saveParaphrase(detectedText, JSON.stringify(paraphrasedContent));

      setIsSheetOpen(true);
      setIsAnalyzed(true);
      sheetRef.current?.snapToIndex(0);
    } catch (error) {
      console.error("Error during analysis or paraphrasing:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleReset = () => {
    setImageUri(null);
    setParaphrasedText("");
    setIsSheetOpen(false);
    setIsAnalyzed(false);
  };

  const { isDarkMode } = useDarkMode();

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <Header title={"Scan A File"} isDarkMode={isDarkMode} />

      <Layout style={styles.buttonContainer}>
      <Text style={styles.greetingMessage}>
          Scan a document here to detect text and paraphrase it.
      </Text>

        {!imageUri ? (
          <View style={styles.animationContainer}>
            <ScanAnimation/>
          </View>
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}

        {!isAnalyzed ? (
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>Choose a File</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.button, styles.resetButton]}
          >
            <Text style={styles.buttonText}>Generate Another File</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={analyzeAndParaphrase}
          disabled={!imageUri || isAnalyzed}
          style={[
            styles.analyzeButton,
            (!imageUri || isAnalyzed) && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Analyze & Paraphrase</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate("Upload")}
          style={[styles.button, styles.switchButton]}
        >
          <Text style={styles.buttonText}>Switch to Upload</Text>
        </TouchableOpacity>
      </Layout>

      {isSheetOpen && ( 
          <BottomSheetModal
            sheetRef={sheetRef}
            paraphrasedText={paraphrasedText}
          />
      )}
    </SafeAreaView>
  );
};

export default ScanDocScreen;

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark.black : colors.apple.offWhite,
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: "transparent",
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
    width: "100%",
    margin:"auto",
    textAlign: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.light.bgBlue,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  barIcon: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    padding: 30,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
});
