import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Icon } from "@ui-kitten/components";
import QuickAccessCard from "@/components/atoms/quickAccessCard";
import OptionButton from "@/components/atoms/optionButton";
import Header from "@/components/headers/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/css/globals";
import {
  useFonts,
  DMSans_400Regular,
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";

export const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const UploadIcon = (props) => <Icon name="upload-outline" {...props} />;

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#FFFF"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.fullPage} edges={['top', 'left', 'right']}>
          <Header title={"Home"} />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Layout style={styles.greetingSection}>
              <Text style={styles.greetingText}>
                Need help <Text style={styles.greetingTextColored}>simplifying</Text>{" "}
                {"\n"}a form today?
              </Text>
            </Layout>

            <Layout style={styles.optionLayout}>
              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Search"
                  accessory={SearchIcon}
                  destination="Folder"
                />
                <Text style={styles.optionText}>Search</Text>
              </Layout>
              <Layout style={styles.optionColumn}>
                <OptionButton
                  title="Scan"
                  accessory={() => (
                    <Image
                      source={require("@/assets/images/icon_scan1600x1600.png")}
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

            <View style={{ height: 24 }} />

            <Layout style={styles.subhead}>
              <Text style={styles.headline}>Recent Forms</Text>
              <Text style={styles.headlineButton}>View All</Text>
            </Layout>

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

            <View style={{ height: 24 }} />

            <Layout style={styles.subhead}>
              <Text style={styles.headline}>Quick Access</Text>
              <Text style={styles.headlineButton}>View All</Text>
            </Layout>

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

            <Layout style={styles.bottomSpacerLogo}>
              <Image
                source={require("@/assets/images/logo40.png")}
                style={styles.bottomSpacerLogo}
              />
            </Layout>
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
  fullPage: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  greetingSection: {
    backgroundColor: "transparent",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: "100%",
  },
  greetingText: {
    ...typography(true).h1,
    color: colors.light.deepBlue,
  },
  greetingTextColored: {
    ...typography(true).h1,
    color: colors.light.blue,
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
    ...typography(true).body,
    colors: colors.light.deepBlue,
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
  recentFormsSection: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    gap: 8,
  },
  headline: {
    marginBottom: 8,
    ...typography(true).h4,
    color: colors.light.deepBlue60,
  },
  headlineButton: {
    fontSize: 14,
    ...typography(true).footnote,
    color: colors.light.deepBlue60,
  },
  subhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  libraryButtonContainer: {
    width: "100%",
  },
  bottomSpacerLogo: {
    backgroundColor: "transparent",
    width: 102,
    height: 87,
    alignSelf: "center",
  },
});
