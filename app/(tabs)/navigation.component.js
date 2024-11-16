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
const Stack = createStackNavigator();

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

// Screens That Appear On NavBar
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="FormLibrary" component={FormLibraryScreen} />
    <Tab.Screen name="MyFiles" component={MyFilesScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

// Exterior Screens
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={TabNavigator} />

    {/* Add Other Screens Below */}
    <Stack.Screen name="Library" component={LibraryScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="PensionPlan" component={AutofilledScreen} />
  </Stack.Navigator>
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
