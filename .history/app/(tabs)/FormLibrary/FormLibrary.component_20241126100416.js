import React, { useState, useMemo } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import formLibraryData from "@/data/FormLibraryData";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FormLibraryCard from "@/components/atoms/FormLibraryCard";
import { useDarkMode } from "../context/DarkModeContext";

export const FormLibraryScreen = ({ navigation }) => {
  const [filteredForms, setFilteredForms] = useState(formLibraryData);

  const { isDarkMode } = useDarkMode();

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const onSearch = (query) => {
    if (query.trim()) {
      const filtered = formLibraryData.filter((form) =>
        form.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredForms(filtered);
    } else {
      setFilteredForms(formLibraryData);
    }
  };

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  return (
    <>
    <View style={styles.fullPage}>
      <SafeAreaView edges={["top", "left", "right"]}>
        <LinearGradient
          colors={
            isDarkMode
              ? [ colors.dark.black, colors.dark.darkGrey80] // Smooth dark gradient
              : [colors.apple.offWhite, "#D8ECFF"] // Smooth light gradient
          }
          style={styles.bgGradient}
          start={{ x: 0.5, y: 0.75 }} // Adjust the starting point for visual appeal
          end={{ x: 0.5, y: 1 }} // Adjust the ending point
        >
        <Header
          title={"Form Library"}
          placeholder={"Search for the right form"}
          hasSearchBar
          onSearch={onSearch}
          isDarkMode={isDarkMode}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Layout style={styles.container}>
            {filteredForms.map((form, index) => (
              <View
                key={`${form.id}-${index}`}
                style={styles.libraryCardContainer}
              >
                <FormLibraryCard
                  title={form.title}
                  description={form.description}
                  image={form.image}
                />
              </View>
            ))}
            <View style={[styles.libraryCardContainer, styles.endContainer]}>
              <Text style={styles.endTextTitle}>
                Your Needs
                {"\n"}Come First
              </Text>
              <Text style={styles.endTextDescription}>
                Let us know what forms we are missing, and we'll do our best to
                include it!
              </Text>
            </View>
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
          </LinearGradient>
      </SafeAreaView>
    </View>
    </>
  );
};

export default FormLibraryScreen;

const getStyles = (isDarkMode) => ({
  bgGradient: {
    flex: 1,
    // paddingBottom: 132,
  },

  fullPage: {
    flex: 1,
    backgroundColor: isDarkMode ? colors.apple.black : colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    gap: 8,
  },

  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 12,
    // gap: 4,
    // justifyContent: "center",
  },
  libraryCardContainer: {
    // width: "49.4%",
    width: "50%",
  },
  endContainer: {
    backgroundColor: colors.bg.blue,
    borderRadius: 24,
    gap: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 304,
  },
  endTextTitle: {
    ...typography(true).h2Med,
    color:isDarkMode ? colors.apple.white : colors.apple.black,
  },
  endTextDescription: {
    ...typography(true).footnote,
    color: isDarkMode ? colors.apple.glass20 : colors.apple.secondaryText,
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
    color: isDarkMode ? colors.apple.glass20 : colors.light.deepBlue40,
    textAlign: "center",
  },
});
