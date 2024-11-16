import React from "react";
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
import QuickAccessCard from "@/components/molecules/QuickAccessCard";
import ActionButton from "@/components/atoms/actionButton";
import Header from "@/components/header/Header";
import FormListCard from "@/components/molecules/FormListCard";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/css/globals";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";

export const HomeScreen = ({ navigation }) => {
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
          {/* Spacer */}
          <View style={{ height: 8 }} />

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

          {/* Spacer */}
          {/* <View style={{ height: 24 }} /> */}

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
              <View style={styles.formButtonContainer}>
                <FormListCard
                  title="Pension Plan Application"
                  subheader="Sarah O’Neil"
                  footnote="Modified Oct 16, 2024 - Draft ✎"
                />
              </View>
              <Divider style={styles.divider}/>
              <View style={styles.formButtonContainer}>
                <FormListCard
                  title="Medical Form"
                  subheader="Chris Topher"
                  footnote="Modified Oct 16, 2024 - Draft ✎"
                />
              </View>
            </Layout>
          </Layout>

          {/* Spacer */}
          <View style={{ height: 24 }} />

          {/* Quick Access Section
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
          </Layout> */}

          {/* End Image */}
          <Layout style={styles.bottomSpacerLogo}>
            <Image
              source={require("@/assets/images/logo40.png")}
              style={styles.bottomSpacerLogo}
            />
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
    backgroundColor: colors.apple.glass70,
    marginHorizontal: 8,
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  recentFormsSection: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    // paddingHorizontal: 8,
    // gap: 4,
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
    paddingHorizontal: 16,
  },
  divider: {
    marginHorizontal: 24,
    backgroundColor: colors.apple.lightStroke,
  },


  // quickAccessSection: {
  //   backgroundColor: "transparent",
  // },
  // cardScrollContainer: {
  //   flexDirection: "row",
  //   gap: 4,
  //   paddingHorizontal: 8,
  // },

  bottomSpacerLogo: {
    marginVertical: 24,
    backgroundColor: "transparent",
    width: 102,
    height: 88,
    alignSelf: "center",
  },
});

// Old Code

{
  /* <LinearGradient
  colors={["#9FC3E5", "#FFFF"]}
  style={styles.gradientContainer}
> */
}

{
  /* </LinearGradient> */
}

// gradientContainer: {
//   flex: 1,
//   backgroundColor: "transparent",
// },

{
  /* <Layout style={styles.optionLayout}>
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
</Layout> */
}
