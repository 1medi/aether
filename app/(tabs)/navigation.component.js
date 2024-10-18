import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { HomeScreen } from './home.component';
import { DetailsScreen } from './details.component';
import { CameraScreen } from './camera.component';
import { FolderScreen } from './folder.component';
import { PeopleScreen } from './people.component';

const { Navigator, Screen } = createBottomTabNavigator();

const SocialIcon = (props) => (
  <Icon name="people-outline" {...props} />
);

const FileIcon = (props) => (
  <Icon name="file-text-outline" {...props} />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props} />
);

const FolderIcon = (props) => (
  <Icon name="alert-circle-outline" {...props}
  
  />
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={styles.navBarContainer} 
  >
    <BottomNavigationTab icon={HomeIcon} title="Home" />
    <BottomNavigationTab icon={FileIcon} title="Details" />
    <BottomNavigationTab
      icon={(props) => (
        <Icon {...props} name="camera-outline" style={styles.cameraIcon} />
      )}
      style={styles.cameraTab}  
    />
    <BottomNavigationTab icon={FolderIcon} title="Folder" />
    <BottomNavigationTab icon={SocialIcon} title="People" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator style={styles.navContainer} tabBar={props => <BottomTabBar {...props} />}>
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

const styles = {
  navBarContainer: {
    backgroundColor: '#E0F7FA',  
    borderRadius: 20,  
    paddingBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 80,
    border: '20px'
  },
  cameraTab: {
    backgroundColor: '#003366',  
    borderRadius: 40,
    marginTop: -30,
    elevation: 5,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#ffffff', 
  },
  navContainer: {
    border: '2px solid red'
  }
};


