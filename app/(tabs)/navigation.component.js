import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import { HomeScreen } from './home.component';
import { FormHistoryScreen } from './FormHistory/FormHistory.component';
import { CameraScreen } from './CameraForm/camera.component';
import { FolderScreen } from './FormLibrary/folder.component';
import LibraryScreen, { Library } from './FormLibrary/library.component';
import AutofilledScreen, { PensionPlan } from './FormLibrary/autofilled.component';

import { PeopleScreen } from './SavedProfiles/people1.component';
import { StyleSheet, Image } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const SocialIcon = (props) => (
  <Icon name="person-outline" {...props}
    style={{ width: 32, height: 32, marginHorizontal: 5, paddingBottom: 25 }}
  />
);

const BookIcon = (props) => (
  <Icon name="book-outline" {...props}
    style={{ width: 32, height: 32, marginHorizontal: 5 }}
  />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props}
    style={{ width: 32, height: 32, marginHorizontal: 5}}
  />
);

const FolderIcon = (props) => (
  <Icon name="folder-outline" {...props}
    style={{ width: 32, height: 32, marginHorizontal: 5}}
  />
);

const BottomTabBar = ({ navigation, state }) => (
  <Layout style={styles.navOuterContainer}>
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={styles.navBarContainer}
    >
      <BottomNavigationTab
        title="Home"
        icon={HomeIcon}
        titleStyle={styles.labelStyle}
      />
      <BottomNavigationTab
        title="Browse"
        icon={FolderIcon}
        titleStyle={styles.labelStyle}
      />
      <BottomNavigationTab
        title="My Files"
        icon={BookIcon}
        titleStyle={styles.labelStyle}
      />
      <BottomNavigationTab
        title="Account"
        icon={SocialIcon}
        titleStyle={styles.labelStyle}
      />
    </BottomNavigation>
  </Layout>
);

const TabNavigator = () => (
  <Navigator screenOptions={{
    headerShown: false,
  }} style={styles.navContainer} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} options={{ title: 'Aether Home' }} />
    <Screen name="Details" component={FolderScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Folder" component={FormHistoryScreen} />
    <Screen name="People" component={PeopleScreen} />
    <Screen name="Library" component={LibraryScreen} />

    <Screen name="PensionPlan" component={AutofilledScreen} />
  </Navigator>
);

export const AppNavigator = () => (
    <TabNavigator />
);

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(240, 243, 245, 0.60)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(46, 139, 183, 0.20)',
    alignSelf: 'center',
    border: 20,
    bottom: 0,
    zIndex: 999,
    width: '100%',
    height: 88,
    flexShrink: 0,
    shadowColor: 'rgba(8, 65, 92, 0.10)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  
  cameraTab: {
    backgroundColor: '#2E8BB7',
    borderRadius: 20,
    width: 100,
  },
  ScanIcon: {
    width: 48,
    height: 48,
  },
  labelStyle: {
    color: '#08415C',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 20,
    paddingBottom: 10
  },
});


