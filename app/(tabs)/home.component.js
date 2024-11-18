import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import QuickAccessCard from "@/components/atoms/quickAccessCard";
import OptionButton from "@/components/atoms/optionButton";  // Make sure it's memoized
import HeaderProfile from "@/components/molecules/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Icon } from "@ui-kitten/components";
import ActionButton from "@/components/atoms/ActionButton";
import Header from "@/components/header/Header";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors, typography } from "@/css/globals";
import myFormsData from "@/data/MyFormsData";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

// Memoize the Icon components to prevent unnecessary re-renders
const SearchIcon = React.memo((props) => <Icon name="search-outline" {...props} />);
const UploadIcon = React.memo((props) => <Icon name="upload-outline" {...props} />);

export const HomeScreen = ({ navigation }) => {
  const [recentForms, setRecentForms] = useState(myFormsData);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Clarifying", "Summarizing", "Streamlining"];
  const translateY = useSharedValue(0);

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const UploadIcon = (props) => <Icon name="upload-outline" {...props} />;
  const FileIcon = (props) => <Icon name="file-text-outline" {...props} />;

  return (
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>

        {/* Header */}
        <Header title={"Homepage"} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Home Banner */}
          <Layout style={styles.imageSection}>
            <ImageBackground
              source={require("@/assets/images/homePhoto2.png")}
              style={styles.imageBackground}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,1)"]}
                style={styles.gradientOverlay}
              >
                <Layout style={styles.greetingSection}>
                  <Text style={styles.greetingText}>
                    Need help
                    {"\n"}simplifying
                    {"\n"}a form today?
                  </Text>
                </Layout>

                {/* Acton Buttons */}
                <Layout style={styles.actionLayout}>
                  <Layout style={styles.actionColumn}>
                    <ActionButton
                      buttonTitle="Search"
                      buttonDesc="our library"
                      accessory={SearchIcon}
                      destination="FormLibrary"
                    />
                  </Layout>
                  <Layout style={styles.actionColumn}>
                    <ActionButton
                      buttonTitle="Upload"
                      buttonDesc="from device"
                      accessory={UploadIcon}
                      destination="Camera"
                    />
                  </Layout>
                  <Layout style={styles.actionColumn}>
                    <ActionButton
                      buttonTitle="Scan"
                      buttonDesc="a document"
                      accessory={FileIcon}
                      destination="Camera"
                    />
                  </Layout>
                </Layout>
              </LinearGradient>
            </ImageBackground>
          </Layout>

          {/* Recent Forms Section */}
          <Layout style={styles.sectionContainer}>
            <Layout style={styles.subhead}>
              <Text style={styles.headline}>Recent</Text>
              <Icon
                name="arrow-forward-outline"
                style={styles.headlineButton}
              />
            </Layout>
            <Layout style={styles.recentFormsSection}>
              {recentForms.map((form, index) => (
                <React.Fragment key={form.id}>
                  <View style={styles.formButtonContainer}>
                    <MyFormsCard
                      title={form.title}
                      subheader={form.subheader}
                      footnote={form.footnote}
                    />
                  </View>
                  {index < recentForms.length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </Layout>
          </Layout>

          {/* Spacer */}
          <View style={{ height: 40 }} />

          <View style={{ height: 32 }} />

          <View style={styles.subhead}>
            <Text style={styles.headline}>Recent Forms</Text>
            <Text style={styles.headlineButton}>View All</Text>
          </View>
          <Layout style={styles.recentFormsSection}>
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

          <View style={{ height: 32 }} />

          <View style={styles.subhead}>
            <Text style={styles.headline}>Quick Access</Text>
          </View>
          <Layout style={styles.quickAccessSection}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.cardScrollContainer}
              showsHorizontalScrollIndicator={false}
            >
              <QuickAccessCard
                title="Pension Plan Application"
                description="Apply to share your retirement pension with your spouse or partner for potential tax savings."
              />
              <QuickAccessCard
                title="Medical History Form"
                description="Record important health information for quick access."
              />
              <QuickAccessCard
                title="Medication Records"
                description="Organize and access your medication records easily."
              />
            </ScrollView>

            {/* End Image */}
            <Layout style={styles.bottomSpacerSection}>
              <Image
                source={require("@/assets/images/logo40.png")}
                style={styles.bottomSpacerLogo}
              />
              <Text style={styles.bottomMessage}>Aether • 2024</Text>
            </Layout>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    // gap: 4,
  },

  // Banner Section
  imageSection: {
    backgroundColor: "transparent",
    borderRadius: 32,
    overflow: "hidden",
    marginHorizontal: 4,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "DMSans_400Regular",
    color: "#08415C",
  },
  headerBoldText: {
    fontFamily: "DMSans_700Bold",
    color: "#2E8BB7",
    fontSize: 32,
  },
  wordContainer: {
    overflow: "hidden",
    height: 40,
    justifyContent: "center",
  },
  optionLayout: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    gap: "10%",
  },
  optionColumn: {
    gradientOverlay: {
      display: "flex",
      padding: 8,
      flexDirection: "column",
      justifyContent: "flex-end",
      flex: 1,
    },
    imageBackground: {
      width: "100%",
      height: 440,
    },

    greetingSection: {
      backgroundColor: "transparent",
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    greetingText: {
      ...typography(true).display,
      color: colors.apple.white,
    },
    iconImage: {
      width: 36,
      height: 36,
    },
    recentFormsSection: {
      paddingHorizontal: 16,
      backgroundColor: "transparent",
    },
    libraryButtonContainer: {
      minWidth: 380,
      minHeight: 85,
      width: "100%",

      // Action Buttons
      actionLayout: {
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 4,
      },
      actionColumn: {
        backgroundColor: "transparent",
        flex: 1,
        maxWidth: "33.33%",
      },

      // Recent Forms Section
      sectionContainer: {
        backgroundColor: colors.apple.white,
        marginHorizontal: 4,
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 8,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: colors.apple.lightStroke,
      },
      recentFormsSection: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
      },

      // Recent Forms Header & Divider
      subhead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingHorizontal: 12,
      },
      headline: {
        marginBottom: 8,
        ...typography(true).h4Med,
        color: colors.apple.black,
      },
      headlineButton: {
        width: 24,
        height: 24,
      },
      divider: {
        marginHorizontal: 32,
        backgroundColor: colors.apple.lightStroke,
      },

      bottomSpacerSection: {
        backgroundColor: "transparent",
        gap: 16,
      },
      bottomSpacerLogo: {
        backgroundColor: "transparent",
        width: 102,
        height: 88,
        alignSelf: "center",
      },
      bottomMessage: {
        ...typography(true).bodyMed,
        color: colors.light.deepBlue40,
        textAlign: "center",
      },
    });

{
  /* Quick Access Section
          <Layout style={styles.subhead}>
            <Text style={styles.headline}>Quick Access</Text>
            <Icon name="arrow-forward-outline" style={styles.headlineButton} />
          </Layout>
          <Layout style={styles.quickAccessSection}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.cardScrollContainer}
              showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
            >
              <QuickAccessCard
                title="Canadian Pension Plan"
                description="Apply for monthly retirement income from CPP."
              />
              <QuickAccessCard
                title="Disability Tax Credit"
                description="Apply for a tax credit for individuals with disabilities."
              />
              <QuickAccessCard
                title="Assisted Living Application"
                description="Request access to assisted living or long-term care."
              />
            </ScrollView>
          </Layout> */
}
