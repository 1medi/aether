import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, View, } from 'react-native';
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

  const ArrowIcon = (props) => (
    <Icon name='arrow-forward-outline' {...props}
      style={{ width: 25, height: 20, tint: 'white' }}
    />
  );

  const BackIcon = (props) => (
    <Icon name='arrow-circle-left-outline' {...props}
      style={{ width: 30, height: 40, tint: 'white' }}
    />
  );

  return (
    <>
      <SafeAreaView style={styles.homePage}>

        <HeaderProfile />

        <Layout style={{ backgroundColor: 'none', paddingLeft: 20, paddingTop: 20, width: 'auto' }}>
          <Text style={styles.headerText}>Canadian Pension Plan </Text>

          <View style={styles.buttonsContainer}>
  <Pressable style={styles.formButton} onPress={() => navigation.navigate('')}>
    <Layout style={styles.textContainer}>
      <Text style={styles.title}>Autofill</Text>
      <ArrowIcon />
    </Layout>
  </Pressable>
  
  <Pressable style={styles.formButton} onPress={() => navigation.navigate('')}>
    <Layout style={styles.textContainer}>
      <Text style={styles.title}>Simplify</Text>
      <ArrowIcon />
    </Layout>
  </Pressable>
</View>

        </Layout>

        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10 }}>
          <Layout style={{ backgroundColor: 'none', }} >
          </Layout>


        </ScrollView>

      </SafeAreaView>

    </>
  );
}

// Styles
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20, // Adds space from the screen edges
    justifyContent: 'space-between', // Distributes buttons evenly
  },
  formButton: {
    flex: 1, // Makes each button take equal space
    marginHorizontal: 5, // Adds space between buttons
    borderRadius: 10,
    backgroundColor: '#8EAACD',
    height: 40,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#08415C',
  },
});
