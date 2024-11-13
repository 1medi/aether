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
import { FilterButton } from "@/components/atoms/filterButton";
import SectionLibrary from '@/components/atoms/librarySection';

const formsData = [
  {
    id: 1,
    category: "Pension Plan",
    title: "Canadian Pension Plan",
    description:
      "A taxable benefit that replaces part of your income when you retire.",
  },
  {
    id: 2,
    category: "Disability Plan",
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

export const FolderScreen = ({ navigation }) => {
  const [filteredForms, setFilteredForms] = useState(formsData);

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

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  const FilterIcon = (props) => (
    <Icon
      name="options-2-outline"
      {...props}
      style={{ width: 32, height: 32, tint: "white" }}
    />
  );

  const handleFilterChange = (index) => {
    const selectedCategory =
      index.row === 0 ? "All" : formsData[index.row - 1].category;
    setFilteredForms(
      selectedCategory === "All"
        ? formsData
        : formsData.filter((form) => form.category === selectedCategory)
    );
  };



  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      >
        <SectionLibrary/>
        <SafeAreaView style={styles.homePage}>
        
          <Layout style={styles.pageContent}>
          
         

          <FilterButton onSelect={handleFilterChange} />
        
            </Layout>
          <ScrollView
            style={{ marginHorizontal: 5, backgroundColor: "none", margin: 10 }}
          >
            <Layout style={{ backgroundColor: "none" }}>
              {filteredForms.map((form) => (
                <LibraryButton
                  key={form.id}
                  title={form.title}
                  subheader={form.description}
                  onPress={() => navigateToCategory(form.category)}
                />
              ))}
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "none",
    height: "100%",
  },
  gradientContainer: {
    flex: 1, // Make gradient cover the entire screen
    position: 'absolute', // Keep the gradient fixed as background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  pageContent: {
    marginTop: 150, // Add margin to avoid overlap with the gradient
    backgroundColor: "none",
  }, 

  headerContainer: {
    display: 'flex',   
    alignSelf: 'stretch', 
    alignItems: 'center', 
    paddingTop: 56,
    paddingRight: 198,
    paddingBottom: 9,
    paddingLeft: 16,
  }, 

  headerText: {
    fontSize: 36,
    fontFamily: "Inter_400Regular",
    fontWeight: 500, 
    lineHeight: 'normal', 
    color: "#08415C",
    
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: "#08415C",
    backgroundColor: "transparent",
  },

  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "none",
  },

  largeNumber: {
    textAlign: 'right', 
    letterSpacing: -6.8, 
    fontSize: 136,
    fontWeight: "bold",
    color: "#6D96B7",
    marginRight: 10,
  },
  numberTextContainer: {
    flexDirection: "column",
  },
  subText: {
    fontSize: 16,
    color: "#6D96B7",
    marginBottom: 5,
    width: 100,
  },
  formsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A374A",
  },

  largeNumber: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#6D96B7",
    marginRight: 10,
  },
  numberTextContainer: {
    flexDirection: "column",
  },
  subText: {
    fontSize: 16,
    color: "#6D96B7",
    marginBottom: 5,
    width: 100,
  },
  formsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A374A",
  },
});
