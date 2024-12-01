import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@ui-kitten/components";

const LoadParaphrasesScreen = ({ paraphrasedText }) => {
  const [paraphrases, setParaphrases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch paraphrases
  const FetchParaphrases = async () => {
    try {
      const response = await fetch("http://10.0.0.235:8888/paraphrases");

      if (!response.ok) {
        // Log the error response for debugging
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Paraphrases:", data);

      setParaphrases(data);
    } catch (error) {
      console.error("Error fetching paraphrases:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refreshing indicator
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
                <Text style={styles.title}>
                  Uploaded on: {new Date(item.createdAt).toLocaleString()}
                </Text>

                {/* Check if paraphrasedText is a valid array */}
                {Array.isArray(
                  (() => {
                    try {
                      const parsed = JSON.parse(item.paraphrasedText);
                      return parsed; // Return parsed JSON if valid
                    } catch {
                      return null; // Return null if parsing fails
                    }
                  })()
                ) ? (
                  JSON.parse(item.paraphrasedText).map((o, i) => (
                    <View style={styles.jsonBlock} key={`para_${index}_${i}`}>
                      <Text style={styles.subtitle}>
                        {o.Title || "No Title"}
                      </Text>
                      <Text style={styles.description}>
                        {o.description || "No Description"}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.description}>
                    {item.paraphrasedText || "No paraphrased text available."}
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
