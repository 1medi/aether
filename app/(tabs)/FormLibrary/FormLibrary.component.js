import React, { useState } from "react";
import { Button, Divider, Layout, Icon, Input } from "@ui-kitten/components";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/header/Header";
import { colors, typography } from "@/css/globals";
import formsData from "@/app/data/formsData";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";

export const FormLibraryScreen = ({ navigation }) => {
  const [filteredForms, setFilteredForms] = useState(formsData || []);
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
        <Header title={"Form Library"} hasSearchBar />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {formsData.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  { height: item.height },
                  index >= 3 && (index - 3) % 2 === 0
                    ? styles.rightItem
                    : styles.leftItem,
                ]}
              >
                {item.image && (
                  <Image source={item.image} style={styles.image} />
                )}
                <View style={styles.textContainer}>
                  <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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

export default FormLibraryScreen;

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 132,
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    margin: 8,
  },
  item: {
    width: "49.46%", // Two columns with spacing
    backgroundColor: colors.apple.glass70,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 176,
  },

  leftItem: {},
  rightItem: {
    marginTop: "-28.8%",
  },

  textContainer: {
    padding: 12,
  },
  title: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
  },
  description: {
    ...typography(true).footnote,
    color: colors.apple.secondaryText,
    marginTop: 8,
  },

  bottomSpacerLogo: {
    marginVertical: 24,
    backgroundColor: "transparent",
    width: 102,
    height: 88,
    alignSelf: "center",
  },
});
