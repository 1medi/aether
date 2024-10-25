import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import { HomeScreen } from './home.component';
import { DetailsScreen } from './FormHistory/details.component';
import { CameraScreen } from './CameraForm/camera.component';
import { FolderScreen } from './FormLibrary/folder.component';
import { PeopleScreen } from './SavedProfiles/people.component';
import { StyleSheet } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const SocialIcon = (props) => (
  <Icon name="person-outline" {...props}
  style={{width: 48, height: 48}}
  />
);

const BookIcon = (props) => (
  <Icon name="book-outline" {...props}
  style={{width: 48, height: 48}}
  />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props} 
  style={{width: 48, height: 48}}
  />
);

const FolderIcon = (props) => (
  <Icon name="folder-outline" {...props}
  style={{width: 48, height: 48}}
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
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={FolderIcon}/>
    <BottomNavigationTab
      icon={(props) => (
        <Icon {...props} name="file-outline" style={styles.ScanIcon} />
      )}
      style={styles.cameraTab}  
    />
    <BottomNavigationTab icon={BookIcon}/>
    <BottomNavigationTab icon={SocialIcon}/>
  </BottomNavigation>
  </Layout>

);

const TabNavigator = () => (
  <Navigator   screenOptions={{
    headerShown: false, 
  }} style={styles.navContainer} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} options={{ title: 'Aether Home' }} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Folder" component={FolderScreen} />
    <Screen name="People" component={PeopleScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer independent={true} >
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: '#E0F7FA',  
    borderRadius: 20,  
    marginHorizontal: 20,
    height: 80,
    border: '20px',
    tintColor: 'none' 
  },
  navOuterContainer: {
    backgroundColor: 'none',  
    opacity: 12
  },
  navContainer: {
    backgroundColor: 'none',  
  },
  cameraTab: {
    backgroundColor: '#2E8BB7',  
    borderRadius: 40,
    width:100,
  },
  ScanIcon: {
    width: 40,
    height: 40,
    tintColor: '#ffffff', 
  },
});


