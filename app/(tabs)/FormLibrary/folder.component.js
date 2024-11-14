import React, { useState } from "react";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
  Input,
} from "@ui-kitten/components";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import HeaderProfile from "@/components/molecules/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import SectionLibraryTop from "@/components/molecules/librarySection";
import LibraryEmpty from "@/components/atoms/libraryContent";

const formsData = [
  {
    id: 1,
    category: "Pension",
    title: "Canadian Pension Plan",
    description:
      "A taxable benefit that replaces part of your income when you retire.",
  },
  {
    id: 2,
    category: "Health",
    title: "Disability Plan",
    description: "Helps replace income in case of disability.",
  },
  {
    id: 3,
    category: "Taxes",
    title: "T4 Statements",
    description: "Tax statements related to income.",
  },
];

import { LinearGradient } from "expo-linear-gradient";

export const FolderScreen = ({ navigation }) => {
  const [filteredForms, setFilteredForms] = useState(formsData);

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const handleFilterChange = (selectedCategory) => {
    setFilteredForms(
      selectedCategory === "All"
        ? formsData
        : formsData.filter((form) => form.category === selectedCategory)
    );
  };

  return (
    <LinearGradient colors={["#9FC3E5", "#ffff"]} style={styles.gradientContainer}>
      <SectionLibraryTop onSelect={handleFilterChange} />
      <SafeAreaView style={styles.homePage}>
        

        <Layout style={styles.pageContent}>
          
          {filteredForms.length === 0 ? (
            <LibraryEmpty />
          ) : (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              <Layout style={{ backgroundColor: "none" }}>
                {filteredForms.map((form) => (
                  <LibraryButton
                    key={form.id}
                    title={form.title}
                    subheader={form.description}
                    onPress={() => navigateDetails(form.category)}
                  />
                ))}
              </Layout>
            </ScrollView>
          )}
        </Layout>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "none",
    justifyContent: 'center',  
    padding: 16,
  },
  gradientContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pageContent: {
    flex: 1, 
    marginTop: 10,
    backgroundColor: "none",
  },
  scrollView: {
    flex: 1, 
    backgroundColor: "none",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  scrollContent: {
    paddingBottom: 16, 
  },
});
