import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading'; 
import * as Font from 'expo-font';      
import { AppNavigator } from './navigation.component';
import { default as theme } from '@/custom-theme.json'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
      >
        <LinearGradient
          colors={['#eef2ff', '#c4d3ff']}
          style={styles.container} 
        >
          <AppNavigator />
        </LinearGradient>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
