import React, { useState } from "react";
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
import ActionButton from "@/components/atoms/ActionButton";
import Header from "@/components/header/Header";
import MyFormsCard from "@/components/atoms/MyFormsCard";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/css/globals";
import myFormsData from "@/data/MyFormsData";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";

export const HomeScreen = ({ navigation }) => {
  const [recentForms, setRecentForms] = useState(myFormsData);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const SearchIcon = (props) => <Icon name="search-outline" {...props} />;
  const UploadIcon = (props) => <Icon name="upload-outline" {...props} />;
  const FileIcon = (props) => <Icon name="file-text-outline" {...props} />;

  return (
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
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
    gap: 8,
  },

  imageSection: {
    backgroundColor: "transparent",
    borderRadius: 32,
    overflow: "hidden",
    marginHorizontal: 8,
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
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  greetingText: {
    ...typography(true).display,
    color: colors.apple.white,
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
    marginHorizontal: 8,
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
  headline: {
    marginBottom: 8,
    ...typography(true).h4Med,
    color: colors.apple.black,
  },
  headlineButton: {
    width: 24,
    height: 24,
  },
  subhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
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
