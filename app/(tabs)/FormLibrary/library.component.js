import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
  Input,
} from "@ui-kitten/components";
import { StyleSheet, Text, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderProfile from "@/components/molecules/Header";
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import PopUp from "@/components/atoms/autofillPopup";

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

export default function LibraryScreen() {
  const [visible, setVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigation = useNavigation();

  const ArrowIcon = (props) => (
    <Icon
      name="arrow-forward-outline"
      {...props}
      style={{ width: 25, height: 20, tint: "white" }}
    />
  );

  const BackIcon = (props) => (
    <Icon
      name="arrow-circle-left-outline"
      {...props}
      style={{ width: 30, height: 30, tint: "white" }}
    />
  );

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      />
      <SafeAreaView style={styles.homePage}>
        <HeaderProfile />
        <Layout
          style={{ backgroundColor: "none", paddingLeft: 20, width: "auto" }}
        >
          <Text style={styles.headerText}>Canadian Pension Plan</Text>

          <View style={styles.buttonsRow}>
            <Pressable>
              <BackIcon onPress={() => navigation.navigate("Details")} />
            </Pressable>

            <View style={styles.buttons}>
              <PopUp visible={visible} setVisible={setVisible} />

              <Pressable
                style={[styles.formButton, { marginLeft: 15 }]}
                onPress={() => navigation.navigate("")}
              >
                <Layout style={styles.textContainer}>
                  <View style={styles.viewContainer}>
                    <Text style={styles.title}>Simplify</Text>
                    <ArrowIcon />
                  </View>
                </Layout>
              </Pressable>
            </View>
          </View>
        </Layout>

        <ScrollView style={styles.scrollView}>
          <Layout style={{ backgroundColor: "none" }}>
            <Layout style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("@/assets/images/pensionplanform.png")}
              />
            </Layout>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    ...StyleSheet.absoluteFillObject, // Make gradient cover the whole screen
    zIndex: -1, // Send the gradient to the back
  },
  homePage: {
    flex: 1,
    backgroundColor: "none",
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Inter_400Regular",
    color: "#08415C",
  },
  buttonsRow: {
    backgroundColor: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingTop: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formButton: {
    borderRadius: 12,
    borderColor: "transparent",
    backgroundColor: "#8EAACD",
    width: 80,
    height: 30,
    marginBottom: 13,
    overflow: "hidden",
    alignContent: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    backgroundColor: "none",
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 10,
    width: 50,
    fontWeight: "bold",
    color: "#08415C",
  },
  scrollView: {
    marginHorizontal: 5,
    backgroundColor: "none",
    margin: 10,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    resizeMode: "stretch",
  },
});
