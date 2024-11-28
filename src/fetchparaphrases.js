import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import BottomSheet, {BottomSheetView } from '@gorhom/bottom-sheet';

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
                    {/* {Array.isArray(paraphrasedText) &&
            paraphrasedText.map((o, i) => (
              <View style={styles.promptOutput} key={`para_${i}`}>
                <Text style={{ fontWeight: "bold", color: "blue" }}>
                  {o.Title}
                </Text>
                <Text>{o.description}</Text>
              </View>
            ))} */}
          {paraphrases.map((item, index) => (
            <View
              key={item._id}
              style={[
                styles.paraphraseContainer,
                index % 2 === 0 ? styles.evenBackground : styles.oddBackground,
              ]}
            >
              <Text style={styles.title}>Paraphrased Text:</Text>
              {Array.isArray(item.paraphrasedText) ? (
                item.paraphrasedText.map((o, i) => (
                  <View style={styles.jsonBlock} key={`para_${index}_${i}`}>
                    <Text style={styles.subtitle}>{o.Title}</Text>
                    <Text style={styles.description}>{o.description}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.description}>{item.paraphrasedText}</Text>
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