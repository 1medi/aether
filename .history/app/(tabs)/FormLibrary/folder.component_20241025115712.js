import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text, Image } from 'react-native';
import DarkModeIcon from '@/components/atoms/darkMode';
import FilterIcon from '@/components/atoms/filterButton';
import HeaderProfile from '@/components/molecules/header';

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


export const FolderScreen = ({ navigation }) => {

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
  const FilterIcon = (props) => (
    <Icon name='options-2-outline' {...props} />
  );

  const navigateDetails = () => {
    navigation.navigate('Details');
  };



  // const [currentDate, setCurrentDate] = useState('')

  // useEffect(() => {
  //   var date = new Date().getDay()
  //   var month = new Date().getMonth() + 1
  //   var year = new Date().getFullYear()
  //   setCurrentDate(
  //     date + '/' + month + '/' + year
  //   )
  // }, [])




  return (
    <>

      <SafeAreaView style={styles.homePage}>

          <HeaderProfile/>

          <Layout style={{ backgroundColor: 'none', padding: 20, width: 'auto' }}>
            <Text style={styles.headerText}>Form Library</Text>
          </Layout>

          <Layout style={{ backgroundColor: 'none', flexDirection: 'row', alignItems: 'center', margin: 'auto', width: 'auto' }}>
          <Input style={{ borderRadius: '20', width: 300 }}
              placeholder='Search For Forms..'
            />
            <FilterIcon
              style={{fontSize: '40', width: 40, height: 40,  color:'#08415C', backgroundColor:'white', padding:20, borderRadius: 20, overflow: 'hidden', background: 'transparent',  borderColor: 'white', margin: '30'}}
            />
          </Layout>

        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10  }}>
        <Layout style={{ backgroundColor: 'none', }} >
            <CardSimple title='Canadian Pension Plan'/>
            <CardSimple title='Medical Form'/>
            <CardSimple title='Medical Form 2'/>
            <CardSimple title='Tax Form'/>
        </Layout>


        </ScrollView>

      </SafeAreaView>

    </>

  );
};

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

  })