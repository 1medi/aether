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
import { colors } from "@/css/globals";
import { DarkModeProvider } from "./context/DarkModeContext";
import { FolderScreen } from "./FormLibrary/folder.component";
import { useDarkMode } from "./context/DarkModeContext";

const { Navigator, Screen } = createBottomTabNavigator();

const { isDarkMode } = useDarkMode();

const BottomTabBar = ({ navigation, state }) => (
  <View style={styles.navShadowContainer}>
    <BlurView intensity={24} tint="light" style={styles.navOuterContainer}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        style={styles.navBarContainer}
      >
        <BottomNavigationTab
          icon={(props) => (
            <Icon
              {...props}
              name={state.index === 0 ? "home" : "home-outline"}
              style={[
                styles.icon,
                { tintColor: state.index === 0 ? (isDarkMode ? colors.dark.white : colors.light.blue) : colors.apple.black },
              ]}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <Icon
              {...props}
              name={state.index === 1 ? "search" : "search-outline"}
              style={[
                styles.icon,
                { tintColor: state.index === 1 ? colors.light.blue : colors.apple.black },
              ]}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <Icon
              {...props}
              name={state.index === 2 ? "book" : "book-outline"}
              style={[
                styles.icon,
                { tintColor: state.index === 2 ? colors.light.blue : colors.apple.black },
              ]}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <Icon
              {...props}
              name={state.index === 3 ? "person" : "person-outline"}
              style={[
                styles.icon,
                { tintColor: state.index === 3 ? colors.light.blue : colors.apple.black },
              ]}
            />
          )}
        />
      </BottomNavigation>
    </BlurView>
  </View>
);

const TabNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
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
  </Navigator>
);

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
