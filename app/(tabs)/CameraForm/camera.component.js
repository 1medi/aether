import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, registerCallableModule } from "react-native";
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

import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic
} from "@expo-google-fonts/dm-sans";

import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const CameraScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
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

  return (
    <>
      <LinearGradient
        colors={["#9FC3E5", "#ffff"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.homePage}>
          <HeaderProfile />
<ScrollView style={{ marginHorizontal: 5, backgroundColor: "transparent" }}>
  <Layout
    style={{ backgroundColor: "transparent", padding: 20, alignSelf: "center" }}
  >
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={[styles.headerText, { textAlign: "left" }]}>
        Hello Chris!{"\n"}Need help{" "}
        <Text
          style={{ fontFamily: "DMSans_700Bold", color: "#2E8BB7" }}
        >
          Simplifying{" "}
        </Text>
        {"\n"}a form today?
      </Text>
    </View>
    <View style={styles.detectContainer}>
      <DetectObject />
    </View>
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
    margin: "auto"
  }
});
