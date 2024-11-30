import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './(tabs)/navigation.component';
import { default as theme } from '@/custom-theme.json';
import { colors } from '@/css/globals';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {TextSizeProvider} from './(tabs)/Account/TextSizeContext'; 

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <TextSizeProvider>
    <GestureHandlerRootView>
    <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
      >
        <AppNavigator />
      </ApplicationProvider>
    </GestureHandlerRootView>
    </TextSizeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});