import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Text, Image } from 'react-native';
import HeaderProfile from '@/components/molecules/Header';
import LibraryButton from '@/components/molecules/FormLibraryButtons'

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';


export default function LibraryScreen() {

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const navigateDetails = () => {
    navigation.navigate('Details');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Another Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
