import React, { useState, useEffect, useMemo } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Icon } from "@ui-kitten/components";
import ActionButton from "@/components/atoms/actionButton";
import Header from "@/components/header/Header";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/css/globals";
import myFormsData from "@/data/MyFormsData";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { DarkModeProvider } from "./context/DarkModeContext";
import AccountScreen from "./Account/Account.component";


export const HomeScreen = ({ navigation }) => {
  const [recentForms, setRecentForms] = useState(myFormsData);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Clarifying", "Summarizing", "Streamlining"];

  const [isDarkMode, setDarkMode] = useState(0);

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out and move the current word down
      opacity.value = withTiming(0, { duration: 500 }); // Fade out
      translateY.value = withTiming(100, { duration: 500 }); // Move the old word down

      // After the old word has faded out and moved down, change the word
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);

        translateY.value = withTiming(-100, { duration: 0 });

        // Fade in and move the new word down into place
        opacity.value = withTiming(1, { duration: 1000 }); // Fade the new word in
        translateY.value = withTiming(0, { duration: 500 }); // Move the new word into place (drop down)
      }, 500); // Wait for the first transition to complete before changing the word
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const UploadIcon = (props) => <Icon name="upload-outline" {...props} />;
  const FileIcon = (props) => <Icon name="file-text-outline" {...props} />;

  return (
    <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
      <DarkModeProvider>
        <AccountScreen />
      </DarkModeProvider>
      <Header title={"Homepage"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
                  {"\n"}
                  <View style={styles.textContainer}>
                    <Animated.View style={animatedStyle}>
                      <Text style={styles.greetingText}>
                        {words[currentWordIndex]}
                      </Text>
                    </Animated.View>
                  </View>
                  {"\n"}a form today?
                </Text>
              </Layout>

              {/* Action Buttons */}
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
            <Icon name="arrow-forward-outline" style={styles.headlineButton} />
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
  );
};

export default HomeScreen;

const getStyles = (isDarkMode) => ({
  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
  },
  imageSection: {
    backgroundColor: "transparent",
    borderRadius: 32,
    overflow: "hidden",
    marginHorizontal: 12,
  },
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
  textContainer: {
    height: 50, // Ensure enough space for the drop-down effect
    justifyContent: "center", // Center the text vertically
    overflow: "hidden", // Prevent overflowing text
  },
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
  sectionContainer: {
    backgroundColor: colors.apple.white,
    marginHorizontal: 12,
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
    color: colors.apple.darkGray,
  },
  headlineButton: {
    width: 16,
    height: 16,
    color: colors.apple.darkGray,
  },
  formButtonContainer: {
    marginBottom: 16,
    borderRadius: 10,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: colors.apple.lightStroke,
  },
  bottomSpacerSection: {
    flex: 1,
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "transparent",
  },
  bottomSpacerLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  bottomMessage: {
    alignSelf: "center",
    ...typography(true).body,
    color: colors.apple.gray,
    backgroundColor: "transparent",
  },
});
