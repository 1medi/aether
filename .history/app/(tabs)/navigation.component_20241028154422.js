import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';
import { HomeScreen } from './home.component';
import { FormHistoryScreen } from './FormHistory/FormHistory.component';
import { CameraScreen } from './CameraForm/camera.component';
import { FolderScreen } from './FormLibrary/folder.component';
import LibraryScreen, { Library } from './FormLibrary/library.component';
import AutofilledScreen, { Autofill } from './FormLibrary/autofilled.component';
import { PeopleScreen } from './SavedProfiles/people.component';
import { StyleSheet,Image } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const SocialIcon = (props) => (
  <Icon name="person-outline" {...props}
  style={{width: 48, height: 48,margin: 10}}
  />
);

const BookIcon = (props) => (
  <Icon name="book-outline" {...props}
  style={{width: 48, height: 48,margin: 10}}
  />
);

const HomeIcon = (props) => (
  <Icon name="home-outline" {...props} 
  style={{width: 48, height: 48,margin: 10}}
  />
);

const FolderIcon = (props) => (
  <Icon name="folder-outline" {...props}
  style={{width: 48, height: 48, margin: 10}}
  />
);

const ScanIcon = (props) => (
  <Image
  {...props}
  source={require('@/assets/images/scanIcon.svg')}
  style={{ width: 64, height: 64, borderRadius: 8, padding:10 }}
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
    <Screen name="Details" component={FolderScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Folder" component={FormHistoryScreen} />
    <Screen name="People" component={PeopleScreen} />
    <Screen name="Library" component={LibraryScreen} />
    <Screen name="PensionPlan" component={AutofilledScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer independent={true} >
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  navBarContainer: {
    position:'absolute',
    backgroundColor: 'rgba(255,255,255,0.6)',  
    borderRadius: 20,  
    marginHorizontal: 20,
    border: '20px',
    bottom:15,
    zIndex:999
  },

  cameraTab: {
    backgroundColor: '#2E8BB7',  
    borderRadius: 20,
    width:100,
  },
  ScanIcon: {
    width: 48,
    height: 48,
    tintColor: '#E0F7FA', 
  },
});


