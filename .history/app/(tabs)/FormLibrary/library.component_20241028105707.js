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

  const FilterIcon = (props) => (
    <Icon name='options-2-outline' {...props}
      style={{ width: 32, height: 32, tint: 'white' }}
    />
  );

  return (
    <>
    <SafeAreaView style={styles.homePage}>

        <HeaderProfile />
        <Layout style={{ backgroundColor: 'none', paddingLeft: 20, paddingTop: 20, width: 'auto' }}>
          <Text style={styles.headerText}>Canadian Pension Plan Application</Text>
        </Layout>
        

        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10 }}>
          <Layout style={{ backgroundColor: 'none', }} >
          </Layout>


        </ScrollView>

      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create(
  {
    homePage: {
      flex: 1,
      backgroundColor: 'none'
    },
    headerText: {
      fontSize: 32,
      fontFamily: 'Inter_400Regular',
      color: '#08415C'
    },
    numberContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      margin: 20,
      backgroundColor: 'none',
      paddingRight: 50
    },
    largeNumber: {
      fontSize: 100,
      fontWeight: 'bold',
      color: '#6D96B7',
      marginRight: 10,
    },
    numberTextContainer: {
      flexDirection: 'column',

    },
    subText: {
      fontSize: 16,
      color: '#6D96B7',
      marginBottom: 5,
      width: 100
    },
    formsText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2A374A',
    },
    numberContainer: {
      flexDirection: 'row', 
      alignItems: 'flex-end', 
      margin: 10,
      backgroundColor: 'none',
      paddingRight:50,
      borderTopWidth: 2,
      borderColor: 'white'
    },
    largeNumber: {
      fontSize: 100, 
      fontWeight: 'bold', 
      color: '#6D96B7', 
      marginRight: 10, 
    },
    numberTextContainer: {
      flexDirection: 'column',

    },
    subText: {
      fontSize: 16, 
      color: '#6D96B7', 
      marginBottom: 5, 
      width:100
    },
    formsText: {
      fontSize: 24, 
      fontWeight: 'bold', 
      color: '#2A374A', 
    },

  })