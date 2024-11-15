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
import { FormHistoryScreen } from "./FormHistory/FormHistory.component";
import { CameraScreen } from "./CameraForm/camera.component";
import { FolderScreen } from "./FormLibrary/folder.component";
import LibraryScreen from "./FormLibrary/library.component";
import AutofilledScreen from "./FormLibrary/autofilled.component";
import { PeopleScreen } from "./SavedProfiles/people1.component";
import { colors } from "@/css/globals";

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props} style={{ width: 32, height: 32 }} />
);
const SearchIcon = (props) => (
  <Icon name="search-outline" {...props} style={{ width: 32, height: 32 }} />
);
const BookIcon = (props) => (
  <Icon name="book-outline" {...props} style={{ width: 32, height: 32 }} />
);
const AccountIcon = (props) => (
  <Icon name="person-outline" {...props} style={{ width: 32, height: 32 }} />
);

const BottomTabBar = ({ navigation, state }) => (
  <View style={styles.navShadowContainer}>
    <BlurView intensity={24} style={styles.navOuterContainer}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        style={styles.navBarContainer}
      >
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={SearchIcon} />
        <BottomNavigationTab icon={BookIcon} />
        <BottomNavigationTab icon={AccountIcon} />
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
    <Screen name="Home" component={HomeScreen} options={{ title: "Aether Home" }} />
    <Screen name="Details" component={FolderScreen} />
    {/* <Screen name="Camera" component={CameraScreen} /> */}
    <Screen name="Folder" component={FormHistoryScreen} />
    <Screen name="People" component={PeopleScreen} />
    <Screen name="Library" component={LibraryScreen} />
    <Screen name="PensionPlan" component={AutofilledScreen} />
  </Navigator>
);

export const AppNavigator = () => <TabNavigator />;

const styles = StyleSheet.create({
  navShadowContainer: {
    shadowColor: colors.light.black20,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  navOuterContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: colors.light.white60,
    position: "absolute",
    bottom: 24,
    width: 264,
    height: 80,
    zIndex: 999,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.light.lightStroke,
    elevation: 5,
  },
  navBarContainer: {
    backgroundColor: "transparent",
  },
});