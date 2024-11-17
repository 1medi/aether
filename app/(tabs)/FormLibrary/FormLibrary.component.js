import React, { useState } from "react";
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
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import FormLibraryCard from "@/components/atoms/FormLibraryCard";

export const FormLibraryScreen = ({ navigation }) => {
  const [filteredForms, setFilteredForms] = useState(formLibraryData);

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
        <Header
          title={"Form Library"}
          placeholder={"Search for the right form"}
          hasSearchBar
          onSearch={onSearch}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Layout style={styles.container}>
            {filteredForms.map((form) => (
              <View key={form.id} style={styles.libraryCardContainer}>
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
                Let us know what forms we are missing, and we'll do our best to include it!
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
      </SafeAreaView>
    </>
  );
};

export default FormLibraryScreen;

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

  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 4,
    // gap: 4,
    justifyContent: "center",
  },
  libraryCardContainer: {
    // width: "49.4%",
    width: "50%",
  },
  endContainer: {
    backgroundColor: colors.bg.green,
    borderRadius: 24,
    gap: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 304,
  },
  endTextTitle: {
    ...typography(true).h2Med,
    color: colors.apple.black,
  },
  endTextDescription: {
    ...typography(true).footnote,
    color: colors.apple.secondaryText,
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
