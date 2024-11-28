import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const LoadParaphrasesScreen = ({ paraphrasedText }) => {
  const [paraphrases, setParaphrases] = useState([]); // State for fetched paraphrases
  const [loading, setLoading] = useState(true); // State for loading spinner

  // Function to fetch paraphrases
  const FetchParaphrases = async () => {
    try {
      const response = await fetch("http://10.65.96.95:8888/paraphrases"); // Backend endpoint
      const data = await response.json(); // Parse response JSON
      console.log("Fetched Paraphrases:", data);
      setParaphrases(data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching paraphrases:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Call FetchParaphrases when the component mounts
  useEffect(() => {
    FetchParaphrases();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show spinner while loading
      ) : (
        <ScrollView>
          {paraphrases
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
            .map((item, index) => (
              <View
                key={item._id}
                style={[
                  styles.paraphraseContainer,
                  index % 2 === 0
                    ? styles.evenBackground
                    : styles.oddBackground,
                ]}
              >
                {/* Display the date */}
                <Text style={styles.title}>
                  Uploaded on: {new Date(item.createdAt).toLocaleString()}
                </Text>

                {/* Check if paraphrasedText is a valid array */}
                {Array.isArray(JSON.parse(item.paraphrasedText)) ? (
                  JSON.parse(item.paraphrasedText).map((o, i) => (
                    <View style={styles.jsonBlock} key={`para_${index}_${i}`}>
                      <Text style={styles.subtitle}>{o.Title}</Text>
                      <Text style={styles.description}>{o.description}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.description}>
                    No paraphrased text available.
                  </Text>
                )}
              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LoadParaphrasesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  paraphraseContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  evenBackground: {
    backgroundColor: "#ffffff",
  },
  oddBackground: {
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    paddingLeft: 10,
  },
  jsonBlock: {
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
    paddingLeft: 8,
  },
});
