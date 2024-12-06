import React, { useState, useMemo, useRef } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Touchable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button, Layout, Icon } from "@ui-kitten/components";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import axios from "axios";
import { useDarkMode } from "@/app/(tabs)/context/DarkModeContext";
import { color } from "@rneui/base";
import { ColorSpace } from "react-native-reanimated";
import UploadAnimation from "../components/atoms/uploadAnimation";
import BottomSheetModal from "@/components/molecules/BottomSheetModal";
import { ActivityIndicator } from "react-native";
import LoadingAnimation from "../components/atoms/loadingAnimation";

const UploadDocScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [loading, setLoading] = useState(false);
  const sheetRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [paraphrases, setParaphrases] = useState([]);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      return true;
    }

    if (status === "denied") {
      // Inform the user and provide guidance to enable permissions
      alert(
        "Camera roll permissions are required to use this feature. Please enable them in your device settings."
      );
    } else if (status === "blocked") {
      // If the user has permanently denied the permission
      alert(
        "Permissions have been permanently denied. Please enable them from your device settings to continue."
      );

      // Optionally provide a link to app settings
      const openSettings = () => {
        Linking.openSettings().catch(() => {
          alert("Unable to open settings. Please open them manually.");
        });
      };

      openSettings();
    }

    return false;
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

  const saveParaphrase = async (paraphrasedContent) => {
    const controller = new AbortController();
    const timeout = 20000; // Timeout in milliseconds 
  
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  
    try {
      const response = await fetch("https://aether-wnq5.onrender.com/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paraphrasedText: JSON.stringify(paraphrasedContent),
        }),
        signal: controller.signal, // Attach the AbortController signal
      });
  
      clearTimeout(timeoutId); // Clear the timeout once the request completes
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Paraphrase saved successfully:", data);
  
        // Return the saved MongoDB ID
        return data.id;
      } else {
        console.error("Error saving paraphrase:", data.error);
        alert(`Error: ${data.error}`);
        return null;
      }
    } catch (error) {
      clearTimeout(timeoutId); // Ensure timeout is cleared even if an error occurs
  
      if (error.name === "AbortError") {
        console.error("Request timed out");
        alert("Request timed out. Please try again.");
      } else {
        console.error("Error saving paraphrase:", error);
        alert("Failed to save paraphrase. Please try again.");
      }
      return null;
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
  
      // Step 1: Convert image to base64 and clean the data
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
  
      // Step 2: Use Google Vision API to detect text
      const apiResponse = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      if (!apiResponse.ok) {
        throw new Error("Failed to fetch data from Google Vision API");
      }
  
      const apiResponseData = await apiResponse.json();
  
      let detectedText = "";
      if (apiResponseData.responses[0].fullTextAnnotation) {
        detectedText = apiResponseData.responses[0].fullTextAnnotation.text;
      } else {
        alert("No text detected in the image.");
        setLoading(false);
        return;
      }
  
      // Step 3: Split detected text into smaller chunks
      const chunks = detectedText.match(/[\s\S]{1,1500}/g) || [];
      let paraphrasedContent = [];
  
      for (const chunk of chunks) {
        // Step 4: Call OpenAI API for paraphrasing each chunk
        const paraphraseResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: `
                    You are a paraphraser for professional use. Rewrite the following content according to these guidelines:
                    
                    1. Summarize and Simplify: Explain only what the document says, as if explaining to a 10-year-old. Provide one succinct sentence for each subject.
                    
                    2. Formatting Rules:
  
                       - Avoid any markup or special characters such as "**".
                    
                    Input Content:
                    ${chunk}
                    
                    Return the results in this parsable json form [{"Title":string, "description":string}]
                  `,
                },
              ],
              max_tokens: 4096,
            }),
          }
        );
  
        if (!paraphraseResponse.ok) {
          throw new Error("Failed to fetch data from OpenAI API");
        }
  
        const paraphraseResponseData = await paraphraseResponse.json();
        const arr = JSON.parse(paraphraseResponseData.choices[0].message.content);
        paraphrasedContent = [...paraphrasedContent, ...arr];
      }
  
      // Step 5: Save each paraphrase to the backend and update with IDs
      for (let i = 0; i < paraphrasedContent.length; i++) {
        const savedId = await saveParaphrase(paraphrasedContent[i]); // Use `saveParaphrase`
  
        if (savedId) {
          paraphrasedContent[i]._id = savedId; // Update with MongoDB `_id`
        }
      }
  
      console.log("Final paraphrased content with IDs:", paraphrasedContent);
  
      // Step 6: Update state with the full paraphrased content
      setParaphrasedText(paraphrasedContent);
  
      // Open the bottom sheet to display results
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
      <Header title={"Upload A Form"} isDarkMode={isDarkMode} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Layout style={styles.buttonContainer}>
          <Text style={styles.greetingMessage}>
            Upload a photo of a form here to detect text and clarify it
          </Text>

          {!imageUri ? (
            <View style={styles.scanContainer}>
              <UploadAnimation/>
              <Text style={styles.scanDescription}>
                <Text style={styles.boldText}>Tip:</Text> Clearer photos help
                speed up the analysis process!
              </Text>
            </View>
          ) : (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}

          <TouchableOpacity
            onPress={analyzeAndParaphrase}
            disabled={!imageUri || isAnalyzed || loading}
            style={[
              styles.analyzeButton,
              (!imageUri || isAnalyzed || loading) && styles.disabledButton,
            ]}
          >
            <Text style={styles.buttonText}>Analyze & Clarify</Text>
          </TouchableOpacity>

          {!isAnalyzed ? (
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Upload a Photo</Text>
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
            onPress={() => navigation.navigate("Scan")}
            style={[styles.button, styles.switchButton]}
          >
            <Text style={[styles.buttonText, styles.switchText]}>Switch to Scan</Text>
            <Icon
              name="flip-2-outline"
              width="24"
              height="24"
              fill={colors.apple.black}
            />
          </TouchableOpacity>
        </Layout>

        <Modal
          visible={loading}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setLoading(false)}
        >
          <View style={styles.modalContainer}>
            <LoadingAnimation />
          </View>
        </Modal>

        {isSheetOpen && (
          <BottomSheetModal
            sheetRef={sheetRef}
            paraphrasedText={paraphrasedText}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadDocScreen;

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    gap: 16,
  },

  buttonContainer: {
    marginHorizontal: 16,
    backgroundColor: "transparent",
  },
  greetingMessage: {
    ...typography(true).h2Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 32,
    marginVertical: 24,
  },

  // Scan Container
  scanContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    borderColor: colors.apple.hardStroke,
    height: 200,
    marginVertical: 24,
  },
  scanDescription: {
    ...typography(true).footnote,
    marginTop: 16,
    textAlign: "center",
    color: isDarkMode ? colors.apple.white : colors.apple.black,
    paddingHorizontal: "20%",
    color: colors.apple.secondaryText,
  },
  boldText: {
    ...typography(true).footnoteBold,
    color: colors.apple.black,
  },

  // Buttons
  button: {
    flexDirection: "row",
    backgroundColor: colors.light.blue,
    padding: 16,
    borderRadius: 100,
    marginVertical: 8,
    justifyContent: "center",
    gap: 8,
  },
  analyzeButton: {
    backgroundColor: colors.apple.green,
    padding: 16,
    borderRadius: 100,
    marginVertical: 8,
  },
  switchButton: {
    backgroundColor: colors.apple.white,
    textAlign: "center",
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  switchText: {
    color: colors.apple.black,
  },
  buttonText: {
    ...typography(true).h4Med,
    color: colors.apple.white,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

});
