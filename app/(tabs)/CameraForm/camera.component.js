import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  registerCallableModule,
} from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
} from "@ui-kitten/components";
import Settings from "@/components/atoms/settings.js";
import CardSimple from "@/components/atoms/QuickAccessCard";
import { StyleSheet, Text, Image } from "react-native";

import DetectObject from "@/src/index";
import Header from "@/components/header/Header";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

import { LinearGradient } from "expo-linear-gradient";

export const CameraScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  // const [currentDate, setCurrentDate] = useState('')

  // useEffect(() => {
  //   var date = new Date().getDay()
  //   var month = new Date().getMonth() + 1
  //   var year = new Date().getFullYear()
  //   setCurrentDate(
  //     date + '/' + month + '/' + year
  //   )
  // }, [])

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.homePage}>
          <Header />
          <ScrollView style={{ marginHorizontal: 5, backgroundColor: "none" }}>
            <Layout
              style={{ backgroundColor: "none", padding: 20, width: 400 }}
            >
              <Text style={styles.headerText}>
                Hello Chris!{"\n"}Need help{" "}
                <Text
                  style={{ fontFamily: "Inter_800ExtraBold", color: "#2E8BB7" }}
                >
                  Simplifying{" "}
                </Text>
                {"\n"}a form today?
              </Text>
            </Layout>
            <Layout
              style={{ paddingBottom: 50, backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <DetectObject />
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "none",
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Inter_400Regular",
    color: "#08415C",
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 20,
    backgroundColor: "none",
    paddingRight: 50,
  },
  largeNumber: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#6D96B7",
    marginRight: 10,
  },
  numberTextContainer: {
    flexDirection: "column",
  },
  subText: {
    fontSize: 16,
    color: "#6D96B7",
    marginBottom: 5,
    width: 100,
  },
  formsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A374A",
  },
  gradientContainer: {
    flex: 1,
  },
  detectContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 50,
    paddingBottom: 50,
    margin: "auto",
  },
});
