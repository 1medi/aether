import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

const LoadParaphrasesScreen = () => {
  const [paraphrases, setParaphrases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch paraphrases
  const FetchParaphrases = async () => {
    try {
      const response = await fetch("http://0.0.0.0:8888/paraphrases");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      // Group paraphrases by `createdAt`
      const groupedParaphrases = {};
      data.forEach((item) => {
        const key = new Date(item.createdAt).toLocaleString(); // Group by date string
        if (!groupedParaphrases[key]) {
          groupedParaphrases[key] = [];
        }
  
        try {
          let parsedContent;
  
          // Check if paraphrasedText is already an object
          if (typeof item.paraphrasedText === "string") {
            parsedContent = JSON.parse(item.paraphrasedText); // Parse if string
          } else {
            parsedContent = item.paraphrasedText; // Use directly if not a string
          }
  
          // Ensure parsedContent is in array format
          if (Array.isArray(parsedContent)) {
            groupedParaphrases[key] = [
              ...groupedParaphrases[key],
              ...parsedContent,
            ];
          } else if (typeof parsedContent === "object" && parsedContent !== null) {
            groupedParaphrases[key].push(parsedContent); // Push single object
          } else {
            console.error(
              "Unexpected format for paraphrasedText:",
              parsedContent
            );
          }
        } catch (error) {
          console.error(
            "Error parsing paraphrasedText:",
            item.paraphrasedText,
            error
          );
        }
      });
  
      setParaphrases(groupedParaphrases);
    } catch (error) {
      console.error("Error fetching paraphrases:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Fetch paraphrases on component mount
  useEffect(() => {
    FetchParaphrases();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {Object.keys(paraphrases).length > 0 ? (
            Object.entries(paraphrases).map(([uploadTime, items], groupIndex) => (
              <View key={groupIndex} style={styles.groupContainer}>
                <Text style={styles.uploadTime}>Uploaded on: {uploadTime}</Text>
                {items.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paraphraseContainer,
                      index % 2 === 0
                        ? styles.evenBackground
                        : styles.oddBackground,
                    ]}
                  >
                    <Text style={styles.title}>
                      {item.Title || "No Title"}
                    </Text>
                    <Text style={styles.description}>
                      {item.description || "No Description"}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.placeholder}>No paraphrases found.</Text>
          )}
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
  groupContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  uploadTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    paddingLeft: 10,
  },
  placeholder: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});
