import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';

import HomeScreen from '../src/index';  

import FormHistoryScreen from './FormHistory/FormHistory.component';
import CameraScreen from './CameraForm/camera.component';
import FolderScreen from './FormLibrary/folder.component';
import PeopleScreen from './SavedProfiles/people.component';
import SignInScreen from './SignIn/SignInScreen';
import SignUpScreen from './SignIn/SignUpScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SocialIcon = (props) => (
  <Icon name="person-outline" {...props} style={{ width: 48, height: 48, margin: 10 }} />
);

const BookIcon = (props) => (
  <Icon name="book-outline" {...props} style={{ width: 48, height: 48, margin: 10 }} />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props} style={{ width: 48, height: 48, margin: 10 }} />
);

const FolderIcon = (props) => (
  <Icon name="folder-outline" {...props} style={{ width: 48, height: 48, margin: 10 }} />
);

const ScanIcon = (props) => (
  <Image {...props} source={require('@/assets/images/scanIcon.svg')} style={{ width: 64, height: 64, borderRadius: 8, padding: 10 }} />
);

const BottomTabBar = ({ navigation, state }) => (
  <Layout style={styles.navOuterContainer}>
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={styles.navBarContainer}
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={FolderIcon} />
      <BottomNavigationTab icon={(props) => (<Icon {...props} name="file-outline" style={styles.ScanIcon} />)} style={styles.cameraTab} />
      <BottomNavigationTab icon={BookIcon} />
      <BottomNavigationTab icon={SocialIcon} />
    </BottomNavigation>
  </Layout>
);

const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Details" component={FolderScreen} />
    <Tab.Screen name="Camera" component={CameraScreen} />
    <Tab.Screen name="Folder" component={FormHistoryScreen} />
    <Tab.Screen name="People" component={PeopleScreen} />
  </Tab.Navigator>
);

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
    marginHorizontal: 20,
    bottom: 15,
    zIndex: 999
  },
  cameraTab: {
    backgroundColor: '#2E8BB7',
    borderRadius: 20,
    width: 100,
  },
  ScanIcon: {
    width: 48,
    height: 48,
    tintColor: '#E0F7FA',
  },
});
