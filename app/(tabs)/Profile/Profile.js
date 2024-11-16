import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
  Card,
} from "@ui-kitten/components";
import Settings from "@/components/atoms/settings.js";
import { StyleSheet, Text, Image } from "react-native";
import OptionButton from "@/components/graveyard/optionButton";
import { Input } from "@ui-kitten/components";
import Header from "@/components/header/Header";
import ProfileCard from "@/components/molecules/ProfileCard";
import SearchBar from "@/components/molecules/SearchBar";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

export const ProfileScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const profiles = [
    { name: "Chris Topher", role: "Myself", image: require("@/assets/images/lbj.jpg") },
    { name: "Sarah O’Neil", role: "Care Recipient", image: require("@/assets/images/lbj.jpg") },
    { name: "Pat Rick", role: "Grandpa", image: require("@/assets/images/lbj.jpg") },
  ];

  return (
    <LinearGradient colors={["#9FC3E5", "#ffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.homePage}>
        {/* <HeaderProfile /> */}

        <ScrollView style={{ marginHorizontal: 5, backgroundColor: "none" }}>
          <Layout style={styles.sectionTitle}>
            <Text style={styles.headerText}>Profiles</Text>
          </Layout>

          <SearchBar placeholder="Search My Saved Profiles" />

          <View style={styles.cardContainer}>
            {profiles.map((profile, index) => (
              <ProfileCard
                key={index}
                title={profile.name}
                subheader={profile.role}
                image={profile.image}
                onPress={() => navigation.navigate("ProfileDetails", { profile })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  sectionTitle: {
    paddingLeft: 20,
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Inter_400Regular",
    color: "#08415C",
  },
  cardContainer: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", // Ensures even spacing
    paddingHorizontal: 10, // Adds padding to the container
    paddingVertical: 20, // Adds vertical padding
  },
});