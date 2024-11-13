import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Image } from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import Settings from "@/components/atoms/settings.js";
import CardSimple from "@/components/atoms/card";
import OptionButton from "@/components/atoms/optionButton";
import DarkModeIcon from "@/components/atoms/darkMode";
import HeaderProfile from "@/components/molecules/Header";
import LongCard from "@/components/atoms/longcard"; // Import LongCard component
import { colors, typography } from "@/css/globals"; // Import colors and typography
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

export const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const fonts = typography(fontsLoaded); // Use typography for dynamic font assignment

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const FileTextIcon = (props) => <Icon name={"file-text-outline"} {...props} />;
  const UploadIcon = (props) => <Icon name={"upload-outline"} {...props} />;

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <>
      <LinearGradient colors={["#9FC3E5", "#FFFF"]} style={styles.gradientContainer}>
        <SafeAreaView style={styles.homePage}>
          <HeaderProfile />

          {/* ScrollView with vertical scrolling enabled */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer} // Ensures content is properly spaced within ScrollView
            style={styles.scrollView} // Ensures ScrollView takes full screen height
          >
            <Layout style={styles.headerLayout}>
              <Text style={styles.headerText}>
                Need help{" "}
                <Text
                  style={{
                    fontFamily: 'DMSans_700Bold_Italic',
                    color: "#2E8BB7"
                  }}
                >
                  Simplifying{" "}
                </Text>
                {"\n"}a form today?
              </Text>
            </Layout>

            <Layout style={styles.optionLayout}>
              <Layout style={styles.optionColumn}>
                <OptionButton title="Browse" accessory={SearchIcon} destination="Folder" />
                <Text style={styles.optionText}>Browse</Text>
              </Layout>

              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Scan"
                  accessory={() => <Image source={require('@/assets/images/icon_scan.png')} style={styles.iconImage} />}
                  destination="Camera"
                />
                <Text style={styles.optionText}>Scan</Text>
              </Layout>

              <Layout style={styles.optionColumn}>
                <OptionButton title="Browse" accessory={UploadIcon} destination="Camera" />
                <Text style={styles.optionText}>Upload</Text>
              </Layout>
            </Layout>

            <Text style={styles.quickAccessText}>Quick Access Forms</Text>
            <Layout style={styles.formGrid}>
              <ScrollView horizontal contentContainerStyle={styles.cardScrollContainer}>
                <CardSimple title="Canadian Pension Plan" />
                <CardSimple title="Medical Form" />
                <CardSimple title="Medication Records" />
              </ScrollView>
            </Layout>

            <Layout style={styles.recentFormLayout}>
              <Text style={styles.headline}>Recent Forms</Text>
              <Layout style={styles.recentContent}>
                <Layout style={styles.formContainer}>
                  <LongCard title="Canadian Pension Plan" /> {/* LongCard component */}
                  <LongCard title="Medical Form" /> {/* LongCard component */}
                </Layout>

                {/* Wrap Button inside a container with gradient */}
                <View style={styles.gradientButtonContainer}>
                  <LinearGradient
                    colors={["#71AFCE", "#5B8399"]} // Light to dark gradient colors
                    start={[0, 0]} // Gradient starts from the left
                    end={[1, 0]} // Gradient ends at the right
                    style={styles.gradientButton}
                  >
                    <Button
                      onPress={() => navigation.navigate("Library")}
                      style={styles.ButtonResent}
                      status="basic" // This makes the button transparent inside the gradient
                    >
                      View My Forms
                    </Button>
                  </LinearGradient>
                </View>
              </Layout>
            </Layout>

            <Layout style={styles.bottomSpacer} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  homePage: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollView: {
    backgroundColor: "transparent",
    paddingBottom: 80, // Increased bottom padding to create more space for the button
  },
  scrollContainer: {
    flexGrow: 1, // Ensures ScrollView takes the full screen height if content is small
    paddingBottom: 100, // Adjust this to make sure you have enough space at the bottom
  },
  headerLayout: {
    backgroundColor: "transparent",
    padding: 20,
    paddingBottom: 16,
    width: 400,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "DMSans_400Regular", // Apply DMSans font
    color: "#08415C",
  },
  headerBoldText: {
    fontFamily: "DMSans_700Bold",
    color: "#2E8BB7",
  },
  optionLayout: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 32,
    justifyContent: "space-around",
  },
  optionColumn: {
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  optionText: {
    textAlign: "center",
    color: "#08415C",
    fontFamily: "DMSans_300Light",
    fontSize: 16,
  },
  iconImage: {
    width: 36,
    height: 36,
  },
  quickAccessText: {
    color: "rgba(8, 65, 92, 0.6)",
    paddingLeft: 16,
    fontSize: 16,
  },
  formGrid: {
    paddingTop: 10,
    backgroundColor: "transparent",
  },
  cardScrollContainer: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
  recentFormLayout: {
    backgroundColor: "transparent",
  },
  recentContent: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: 20,
    width: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    backgroundColor: "transparent",
    maxWidth: "100%",
    gap: 8,
  },
  headline: {
    color: "rgba(8, 65, 92, 0.6)",
    paddingLeft: 16,
    fontSize: 16,
  },
  gradientButtonContainer: {
    width: "100%",
    alignItems: "center", // Centers the button inside the container
    marginTop: 32,
  },
  gradientButton: {
    borderRadius: 24,
    overflow: "hidden", // Ensures gradient is clipped to the button's border
  },
  ButtonResent: {
    width: 398,
    height: 54,
    borderRadius: 24,
    backgroundColor: "transparent", // Button background is transparent
    fontSize: 20,
    textAlign: "center",
  },
});
