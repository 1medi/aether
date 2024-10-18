import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading';  // Required for app loading
import * as Font from 'expo-font';          // Required for loading fonts
import { AppNavigator } from './navigation.component';
import { default as theme } from '@/custom-theme.json';  // Your existing theme

// Function to load custom fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'Aether-Regular': require('@/assets/fonts/Lato-Regular.ttf'),  // Adjust with your actual font path
    'Aether-Bold': require('@/assets/fonts/Lato-Bold.ttf'),        // Adjust with your actual font path
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // If fonts are not loaded, show loading screen
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
      >
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
