import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { HomeScreen } from "./Home.component";
import { MyFilesScreen } from "./MyFiles/MyFiles.component";
import { CameraScreen } from "./CameraForm/camera.component";
import { FormLibraryScreen } from "./FormLibrary/FormLibrary.component";
import AutofilledScreen from "./FormLibrary/autofilled.component";
import LibraryScreen from "./FormLibrary/library.component";
import { AccountScreen } from "./Account/Account.component";
import { colors } from "@/css/globals";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FormLibraryStack = createStackNavigator();
const MyFilesStack = createStackNavigator();
const AccountStack = createStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <Layout style={styles.navShadowContainer}>
    <BlurView intensity={24} style={styles.navOuterContainer}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        style={styles.navBarContainer}
      >
        {state.routes.map((route, index) => {
          let iconName;
          if (route.name === "Home") {
            iconName = state.index === index ? "home" : "home-outline";
          } else if (route.name === "FormLibrary") {
            iconName = state.index === index ? "search" : "search-outline";
          } else if (route.name === "MyFiles") {
            iconName = state.index === index ? "book" : "book-outline";
          } else if (route.name === "Account") {
            iconName = state.index === index ? "person" : "person-outline";
          }
          return (
            <BottomNavigationTab
              key={route.key}
              icon={(props) => (
                <Icon
                  name={iconName}
                  fill={colors.apple.black}
                  style={[props.style, { width: 24, height: 24 }]}
                />
              )}
            />
          );
        })}
      </BottomNavigation>
    </BlurView>
  </Layout>
);

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Library" component={LibraryScreen} />
    <HomeStack.Screen name="Camera" component={CameraScreen} />
    <HomeStack.Screen name="PensionPlan" component={AutofilledScreen} />
  </HomeStack.Navigator>
);

const FormLibraryStackNavigator = () => (
  <FormLibraryStack.Navigator screenOptions={{ headerShown: false }}>
    <FormLibraryStack.Screen name="FormLibrary" component={FormLibraryScreen} />
    <FormLibraryStack.Screen name="Library" component={LibraryScreen} />
    <FormLibraryStack.Screen name="Camera" component={CameraScreen} />
    <FormLibraryStack.Screen name="PensionPlan" component={AutofilledScreen} />
  </FormLibraryStack.Navigator>
);

const MyFilesStackNavigator = () => (
  <MyFilesStack.Navigator screenOptions={{ headerShown: false }}>
    <MyFilesStack.Screen name="MyFiles" component={MyFilesScreen} />
    <MyFilesStack.Screen name="Library" component={LibraryScreen} />
    <MyFilesStack.Screen name="Camera" component={CameraScreen} />
    <MyFilesStack.Screen name="PensionPlan" component={AutofilledScreen} />
  </MyFilesStack.Navigator>
);

const AccountStackNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Account" component={AccountScreen} />
    <AccountStack.Screen name="Library" component={LibraryScreen} />
    <AccountStack.Screen name="Camera" component={CameraScreen} />
    <AccountStack.Screen name="PensionPlan" component={AutofilledScreen} />
  </AccountStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="FormLibrary" component={FormLibraryStackNavigator} />
    <Tab.Screen name="MyFiles" component={MyFilesStackNavigator} />
    <Tab.Screen name="Account" component={AccountStackNavigator} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <TabNavigator />
);

const styles = StyleSheet.create({
  navShadowContainer: {
    shadowColor: colors.light.black20,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  navOuterContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: colors.apple.glass70,
    position: "absolute",
    bottom: 24,
    width: 264,
    height: 72,
    zIndex: 999,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    elevation: 5,
  },
  navBarContainer: {
    backgroundColor: "transparent",
  },
});

export default AppNavigator;