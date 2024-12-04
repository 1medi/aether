import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { Icon } from "@ui-kitten/components";

const LoadParaphrasesScreen = ({ paraphrasedText }) => {
  const [paraphrases, setParaphrases] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch paraphrases
  const FetchParaphrases = async () => {
    try {
      const response = await fetch("https://aether-wnq5.onrender.com/paraphrases");
      if (!response.ok) {
        // Log the error response for debugging
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
  
      // Sort paraphrases by date
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      // Group paraphrases by minute
      const groupedParaphrases = {};
      data.forEach((item) => {
        // Truncate to date and time up to the minute
        const date = new Date(item.createdAt);
        const key = date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
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
    }
  };
  
  // Call FetchParaphrases when the component mounts
  useEffect(() => {
    FetchParaphrases();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    FetchParaphrases().finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
