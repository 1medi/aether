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
import LandingPage from './Auth/index';
import LogInPage from './Auth/LogInPage';
import RegisterPage from './Auth/RegisterPage';
import { PeopleScreen } from './SavedProfiles/people1.component';
import { StyleSheet, Image } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const SocialIcon = (props) => (
  <Icon name="person-outline" {...props}
    style={{ width: 45, height: 48, margin: 10 }}
  />
);

const BookIcon = (props) => (
  <Icon name="book-outline" {...props}
    style={{ width: 45, height: 48, margin: 10 }}
  />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props}
    style={{ width: 45, height: 48, margin: 10}}
  />
);

const FolderIcon = (props) => (
  <Icon name="folder-outline" {...props}
    style={{ width: 45, height: 48, margin: 10}}
  />
);

const ScanIcon = (props) => (
  <Image
    {...props}
    source={require('@/assets/images/scanIcon.svg')}
    style={{ width: 64, height: 64, borderRadius: 8, padding: 10 }}
  />
);

// const BottomTabBar = ( { navigation, state } ) => (
//   <Layout style={styles.navOuterContainer}>
//     <BottomNavigation
//       appearance="noIndicator"
//       selectedIndex={state.index}
//       onSelect={index => navigation.navigate(state.routeNames[index])}
//       style={styles.navBarContainer}
//     >
//       <BottomNavigationTab icon={HomeIcon} />
//       <BottomNavigationTab icon={FolderIcon} />
//       <BottomNavigationTab
//         icon={(props) => (
//           <Icon {...props} name="file-outline" style={styles.ScanIcon} />
//         )}
//         style={styles.cameraTab}
//       />
//       <BottomNavigationTab icon={BookIcon} />
//       <BottomNavigationTab icon={SocialIcon} />
//     </BottomNavigation>
//   </Layout>
// );
const BottomTabBar = ( { navigation, state } ) => {
  // 检查当前页面的名称
  if (state.routeNames[state.index] === 'LandingPage'||state.routeNames[state.index] === 'LogInPage'||state.routeNames[state.index] === 'RegisterPage') {
    return null; // 如果当前页面是LandingPage，LogInPage,RegisterPage,则不显示BottomTabBar
  }

  return (
    <Layout style={styles.navOuterContainer}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
        style={styles.navBarContainer}
      >
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={FolderIcon} />
        <BottomNavigationTab
          icon={(props) => (
            <Icon {...props} name="file-outline" style={styles.ScanIcon} />
          )}
          style={styles.cameraTab}
        />
        <BottomNavigationTab icon={BookIcon} />
        <BottomNavigationTab icon={SocialIcon} />
      </BottomNavigation>
    </Layout>
  );
};

const TabNavigator = () => (
  <Navigator screenOptions={{
    headerShown: false,
  } }
    initialRouteName="LandingPage"
    style={ styles.navContainer }
    tabBar={ props => <BottomTabBar { ...props } />
    }>

    <Screen name="Home" component={HomeScreen} options={{ title: 'Aether Home' }} />
    <Screen name="Details" component={FolderScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Folder" component={FormHistoryScreen} />
    <Screen name="People" component={PeopleScreen} />
    <Screen name="Library" component={LibraryScreen} />
    <Screen name="PensionPlan" component={ AutofilledScreen } />
    <Screen name="LandingPage" component={ LandingPage }  />
    <Screen name="LogInPage" component={LogInPage} />
    <Screen name="RegisterPage" component={RegisterPage}  />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer independent={true} >
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.9)',
    borderRadius: 20,
    alignSelf: 'center',
    margin: 20,
    border: 20,
    bottom: 15,
    zIndex: 999,
    width: 360,
    height: 75,
    flexShrink: 0,
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


