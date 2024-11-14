import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet, View } from "react-native";

export default function ProfileCard({ title, subheader, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubheader}>{subheader}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180, 
    height: 167, 
    borderRadius: 12, 
    overflow: "hidden", 
    margin: 10, 
    backgroundColor: "#fff", 
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Added this to make text more readable, might change it after i change the profile pic
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubheader: {
    fontSize: 14,
    color: "#ccc",
  },
});
