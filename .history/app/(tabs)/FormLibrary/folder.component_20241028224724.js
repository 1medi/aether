import React, { useState, useEffect } from 'react';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Text, Image,  SafeAreaView, ScrollView, View, } from 'react-native';
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

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const FilterIcon = (props) => (
    <Icon name='options-2-outline' {...props}
      style={{ width: 32, height: 32, tint: 'white' }}
    />
  );



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
      <LinearGradient
        colors={['#ffff', '#c4d3ff']}
        style={styles.gradientContainer}
      >
      
      <SafeAreaView style={styles.homePage}>

        <HeaderProfile />
        <Layout style={{ backgroundColor: 'none', paddingLeft: 20,  marginHorizontal: 5 }}>
          <Text style={styles.headerText}>Form Library</Text>
        </Layout>
        <Layout style={styles.numberContainer}>

          <Text style={styles.largeNumber}><Text style={{ opacity: .5 }}>0</Text>69</Text>

          <View style={styles.numberTextContainer}>
            <Text style={styles.subText}>Browse from our current library of</Text>
            <Text style={styles.formsText}>forms</Text>
          </View>
        </Layout>


        <Layout style={{ backgroundColor: 'none', paddingLeft: 10, paddingRight: 10, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Input
              style={{
                borderRadius: 20,
                flex: 1, 
                marginRight: 10, 
              }}
              placeholder='Search for forms...'
            />
            <Layout style={styles.iconContainer}>
            <FilterIcon />
              </Layout>
          </Layout>

        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10 }}>
          <Layout style={{ backgroundColor: 'none', }} >
              <LibraryButton title='Canadian Pension Plan' subheader='hi guys' />
            <LibraryButton title='Old Age Security' subheader='hi guys' />
          </Layout>

        </ScrollView>

      </SafeAreaView>
      </LinearGradient>
    </>

  );
};

const styles = StyleSheet.create(
  {
    homePage: {
      flex: 1,
      backgroundColor: 'none',
      height: '100%'
    },
    gradientContainer: {
      flex: 1, // Make gradient cover the entire screen
    },
    iconContainer: {
      width: 40,
      height: 40,  
      borderRadius: 24, 
      backgroundColor: 'white', 
      justifyContent: 'center', 
      alignItems: 'center',   
      padding: 5,              
    },
    filterIcon: {
      width: 24,  
      height: 24,
      tintColor: '#08415C', 
      backgroundColor: 'transparent', 
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