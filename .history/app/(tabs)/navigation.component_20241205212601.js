import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { HomeScreen } from "./home.component";
import { MyFilesScreen } from "./MyFiles/MyFiles.component";
import { CameraScreen } from "./CameraForm/camera.component";
import { FormLibraryScreen } from "./FormLibrary/FormLibrary.component";
import AutofilledScreen from "./FormLibrary/autofilled.component";
import LibraryScreen from "./FormLibrary/library.component";
import { AccountScreen } from "./Account/Account.component";
import SavedProfileScreen from "./SavedProfiles/SavedProfile.component";
import AddProfileScreen from "./SavedProfiles/AddProfile.component";
import { colors } from "@/css/globals";
import { DarkModeProvider } from "./context/DarkModeContext";
import { FolderScreen } from "./FormLibrary/folder.component";
import { useDarkMode } from "./context/DarkModeContext";
import ScanDocScreen from "@/src/ScanDoc.js";
import UploadDocScreen from "@/src/UploadDoc.js";
import ChangeTextSize from "./Account/ChangeTextSize";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state, isDarkMode }) => {
  const currentRoute = state.routeNames[state.index];
  if (currentRoute === "LibraryScreen") {
    return null; // Do not render the navbar
  }
  return (
    <View style={styles.navShadowContainer}>
      <BlurView
        intensity={24}
        tint={isDarkMode ? "dark" : "light"} // Adjust BlurView tint
        style={[
          styles.navOuterContainer,
          {
            backgroundColor: isDarkMode
              ? colors.apple.black20
              : colors.apple.glass70,
          },
        ]}
      >
        <BottomNavigation
          appearance="noIndicator"
          selectedIndex={state.index}
          onSelect={(index) => navigation.navigate(state.routeNames[index])}
          style={styles.navBarContainer}
        >
          {/* Home Tab */}
          <BottomNavigationTab
            icon={(props) => (
              <Icon
                {...props}
                name={state.index === 0 ? "home" : "home-outline"}
                style={[
                  styles.icon,
                  {
                    tintColor:
                      state.index === 0
                        ? isDarkMode
                          ? colors.apple.white
                          : colors.light.blue
                        : isDarkMode
                          ? colors.light.blue
                          : colors.apple.black,
                  },
                ]}
              />
            )}
          />
          {/* Search Tab */}
          <BottomNavigationTab
            icon={(props) => (
              <Icon
                {...props}
                name={state.index === 1 ? "search" : "search-outline"}
                style={[
                  styles.icon,
                  {
                    tintColor:
                      state.index === 1
                        ? isDarkMode
                          ? colors.apple.white
                          : colors.light.blue
                        : isDarkMode
                          ? colors.light.blue
                          : colors.apple.black,
                  },
                ]}
              />
            )}
          />
          {/* Book Tab */}
          <BottomNavigationTab
            icon={(props) => (
              <Icon
                {...props}
                name={state.index === 2 ? "book" : "book-outline"}
                style={[
                  styles.icon,
                  {
                    tintColor:
                      state.index === 2
                        ? isDarkMode
                          ? colors.apple.white
                          : colors.light.blue
                        : isDarkMode
                          ? colors.light.blue
                          : colors.apple.black,
                  },
                ]}
              />
            )}
          />
          {/* Profile Tab */}
          <BottomNavigationTab
            icon={(props) => (
              <Icon
                {...props}
                name={state.index === 3 ? "person" : "person-outline"}
                style={[
                  styles.icon,
                  {
                    tintColor:
                      state.index === 3
                        ? isDarkMode
                          ? colors.apple.white
                          : colors.light.blue
                        : isDarkMode
                          ? colors.light.blue
                          : colors.apple.black,
                  },
                ]}
              />
            )}
          />
        </BottomNavigation>
      </BlurView>
    </View>
  );
};

const TabNavigator = () => {
  const { isDarkMode } = useDarkMode(); // Get dark mode status here

  return (
    <Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      tabBar={(props) => <BottomTabBar {...props} isDarkMode={isDarkMode} />} // Pass isDarkMode
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Aether Home" }}
      />
      <Screen name="FormLibrary" component={FormLibraryScreen} />
      <Screen name="MyFiles" component={MyFilesScreen} />
      <Screen name="Account" component={AccountScreen} />
      <Screen name="LibraryScreen" component={LibraryScreen} />
      <Screen name="Camera" component={CameraScreen} />
      <Screen name="PensionPlan" component={AutofilledScreen} />
      <Screen name="Folder" component={FolderScreen} />
      <Screen name="SavedProfile" component={SavedProfileScreen} />
      <Screen name="AddProfile" component={AddProfileScreen} />
      <Screen name="Scan" component={ScanDocScreen} />
      <Screen name="Upload" component={UploadDocScreen} />
      <Screen name="ChangeTextSize" component={ChangeTextSize} />
    </Navigator>
  );
};

const getTintColor = (isDarkMode, isActive) =>
  isActive
    ? isDarkMode
      ? colors.apple.white
      : colors.light.blue
    : isDarkMode
      ? colors.light.blue
      : colors.apple.black;

const BottomNavigationTabIcon = ({ state, index, iconName, isDarkMode }) => (
  <Icon
    name={state.index === index ? iconName : `${iconName}-outline`}
    style={[
      styles.icon,
      { tintColor: getTintColor(isDarkMode, state.index === index) },
    ]}
  />
);

<BottomNavigationTab
  icon={(props) => (
    <BottomNavigationTabIcon
      {...props}
      state={state}
      index={0}
      iconName="home"
      isDarkMode={isDarkMode}
    />
  )}
/>;

const AppNavigator = () => (
  <DarkModeProvider>
    <TabNavigator />
  </DarkModeProvider>
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
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.light.blue,
  },
});

export default AppNavigator;