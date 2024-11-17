import React, { useState } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import formLibraryData from "@/app/data/FormLibraryData";
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
              <Text style={styles.endTextTitle}>We’ve Got Your Back</Text>
              <Text style={styles.endTextDescription}>
                If you can’t find the form you need, try our scan feature or
                reach out for support. We’re here to help!
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
    marginHorizontal: 8,
    gap: 4,
  },
  libraryCardContainer: {
    width: "49.4%",
  },
  endContainer: {
    backgroundColor: colors.apple.glass70,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    gap: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 32,
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
  },
  bottomSpacerLogo: {
    backgroundColor: "transparent",
    width: 102,
    height: 88,
    alignSelf: "center",
  },
});
