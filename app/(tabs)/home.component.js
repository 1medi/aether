import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import QuickAccessCard from "@/components/atoms/quickAccessCard";
import OptionButton from "@/components/atoms/optionButton";
import HeaderProfile from "@/components/molecules/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/css/globals";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";

export const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const FileTextIcon = (props) => <Icon name="file-text-outline" {...props} />;
  const UploadIcon = (props) => <Icon name="upload-outline" {...props} />;

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#FFFF"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.homePage}>
          <HeaderProfile />

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Layout style={styles.headerLayout}>
              <Text style={styles.headerText}>
                Need help <Text style={styles.headerBoldText}>Simplifying</Text>{" "}
                {"\n"}a form today?
              </Text>
            </Layout>

            <Layout style={styles.optionLayout}>
              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Browse"
                  accessory={SearchIcon}
                  destination="Folder"
                />
                <Text style={styles.optionText}>Browse</Text>
              </Layout>

              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Scan"
                  accessory={() => (
                    <Image
                      source={require("@/assets/images/icon_scan.png")}
                      style={styles.iconImage}
                    />
                  )}
                  destination="Camera"
                />
                <Text style={styles.optionText}>Scan</Text>
              </Layout>

              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Upload"
                  accessory={UploadIcon}
                  destination="Camera"
                />
                <Text style={styles.optionText}>Upload</Text>
              </Layout>
            </Layout>

            <View style={{height: 32}} />

            <View style={styles.subhead}>
              <Text style={styles.headline}>Quick Access</Text>
            </View>
            <Layout style={styles.quickAccessSection}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.cardScrollContainer}
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
              >
                <QuickAccessCard
                  title="Pension Plan Application"
                  description="Apply to share your retirement pension with your spouse or partner for potential tax savings."
                />
                <QuickAccessCard
                  title="Medical History Form"
                  description="Apply to share your retirement pension with your spouse or partner for potential tax savings."
                />
                <QuickAccessCard
                  title="Medication Records"
                  description="Apply to share your retirement pension with your spouse or partner for potential tax savings."
                />
              </ScrollView>
            </Layout>

            <View style={styles.subhead}>
              <Text style={styles.headline}>Recent Forms</Text>
            </View>
            <Layout style={styles.recentFormLayout}>
              <Layout style={styles.recentContent}>
                <Layout style={styles.formContainer}>
                  <View style={styles.libraryButtonContainer}>
                    <LibraryButton
                      title="Pension Plan Application"
                      subheader="Sarah O’Neil"
                      footnote="Modified Oct 16, 2024 - Draft ✎"
                    />
                  </View>
                  <View style={styles.libraryButtonContainer}>
                    <LibraryButton
                      title="Medical Form"
                      subheader="Chris Topher"
                      footnote="Modified Oct 16, 2024 - Draft ✎"
                    />
                  </View>
                </Layout>

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
    paddingBottom: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  headerLayout: {
    backgroundColor: "transparent",
    padding: 20,
    paddingBottom: 16,
    width: 400,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "DMSans_400Regular",
    color: "#08415C",
  },
  headerBoldText: {
    fontFamily: "DMSans_700Bold",
    color: "#2E8BB7",
  },
  optionLayout: {
    flexDirection: "row",
    backgroundColor: "transparent",
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
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
  iconImage: {
    width: 36,
    height: 36,
  },

  quickAccessSection: {
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
    paddingHorizontal: 16,
  },
  recentContent: {
    alignItems: "center",
    backgroundColor: "transparent",
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
    marginBottom: 8,
    fontSize: 18,
    fontFamily: "DMSans_400Regular",
  },

  libraryButtonContainer: {
    width: 398,
    height: 85,
  },

  gradientButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
  gradientButton: {
    borderRadius: 24,
    overflow: "hidden",
  },
  ButtonResent: {
    width: 398,
    height: 54,
    borderRadius: 16,
    backgroundColor: "transparent",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
  },
});
