import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
} from "@ui-kitten/components";
import Settings from "@/components/atoms/settings.js";
import CardSimple from "@/components/atoms/card";
import { StyleSheet, Text, Image } from "react-native";
import OptionButton from "@/components/atoms/optionButton";
import DarkModeIcon from "@/components/atoms/darkMode";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetectObject from "@/src/index";
import HeaderProfile from "@/components/molecules/Header";
import FileUpload from "@/components/molecules/FileUpload";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const CameraScreen = ({ navigation }) => {
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

  // const [currentDate, setCurrentDate] = useState('')

  // useEffect(() => {
  //   var date = new Date().getDay()
  //   var month = new Date().getMonth() + 1
  //   var year = new Date().getFullYear()
  //   setCurrentDate(
  //     date + '/' + month + '/' + year
  //   )
  // }, [])
  
  console.log("cameraform!!!!!");

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.homePage}>
          <HeaderProfile />
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
              <FileUpload />
              {/* <DetectObject /> */}
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
});
