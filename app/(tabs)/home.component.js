import React, { useEffect, useState } from "react";
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
import OptionButton from "@/components/atoms/optionButton";  // Make sure it's memoized
import HeaderProfile from "@/components/molecules/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors, typography } from "@/css/globals";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

// Memoize the Icon components to prevent unnecessary re-renders
const SearchIcon = React.memo((props) => <Icon name="search-outline" {...props} />);
const UploadIcon = React.memo((props) => <Icon name="upload-outline" {...props} />);

export const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Clarifying", "Summarizing", "Streamlining"];
  const translateY = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      translateY.value = withTiming(50, { duration: 500 }, () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        translateY.value = -50;
        translateY.value = withTiming(0, { duration: 500 });
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

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
                Need help{" "}
                <View style={styles.wordContainer}>
                  <Animated.Text style={[styles.headerBoldText, animatedStyle]}>
                    {words[currentWordIndex]}
                  </Animated.Text>
                </View>{" "}
                {"\n"}a form today?
              </Text>
            </Layout>

            <Layout style={styles.optionLayout}>
              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Browse"
                  accessory={SearchIcon}  // SearchIcon is memoized
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
                  accessory={UploadIcon}  // UploadIcon is memoized
                  destination="Camera"
                />
                <Text style={styles.optionText}>Upload</Text>
              </Layout>
            </Layout>

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
    paddingBottom: 100,
  },
  headerLayout: {
    backgroundColor: "transparent",
    padding: 20,
    paddingBottom: 16,
    width: "100%",
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
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "center",
    gap: 8,
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
  recentFormsSection: {
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  libraryButtonContainer: {
    minWidth: 380,
    minHeight: 85,
    width: "100%",
  },
  subhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  headline: {
    color: "rgba(8, 65, 92, 0.6)",
    fontSize: 18,
    fontFamily: "DMSans_400Regular",
  },
  headlineButton: {
    color: "rgba(8, 65, 92, 0.6)",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  bottomSpacer: {
    height: 80,
    backgroundColor: "transparent",
  },
});

export default HomeScreen;
