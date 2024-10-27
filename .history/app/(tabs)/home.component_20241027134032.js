import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text, Image } from 'react-native';
import OptionButton from '@/components/atoms/optionButton'
import DarkModeIcon from '@/components/atoms/darkMode'
import HeaderProfile from '@/components/molecules/Header'

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


export const HomeScreen = ({ navigation }) => {

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
  const SearchIcon = (props) => (
    <Icon name="search-outline" {...props} />
  );

  const FileTextIcon = (props) => (
    <Icon name={"file-text-outline"} {...props} />
  );

  const UploadIcon = (props) => (
    <Icon name={"upload-outline"} {...props} />
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
          <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', minHeigh: 100, paddingBottom: 100 }}>

            <Layout style={{ backgroundColor: 'none', padding: 20, width: 400 }}>
              <Text style={styles.headerText}>Hello Chris!{"\n"}Need help <Text style={{ fontFamily: 'Inter_800ExtraBold', color: '#2E8BB7' }}>Simplifying </Text>{"\n"}a form today?</Text>
            </Layout>

            <Layout style={{ flex: 1, textAlign: 'right', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 15, backgroundColor: 'none',}}>
              <Layout style={{ flexDirection: 'row', backgroundColor: 'none' }}>
                <Layout style={{ flexDirection: 'column', backgroundColor: 'none', }}>
                  <OptionButton
                    title="Browse"
                    accessory={SearchIcon}
                    destination='Details'
                  />
                  <Text style={{ textAlign: 'center', color: '#2E8BB7', fontFamily: 'Inter_400Normal', fontSize: 16 }}>Browse</Text>
                </Layout>

                <Layout style={{ flexDirection: 'column', backgroundColor: 'none' }}>
                  <OptionButton
                    title="Scan"
                    accessory={FileTextIcon}
                    destination='Camera'
                  />
                  <Text style={{ textAlign: 'center', color: '#2E8BB7', fontFamily: 'Inter_400Normal', fontSize: 16 }}>Scan</Text>
                </Layout>

                <Layout style={{ flexDirection: 'column', backgroundColor: 'none' }}>
                  <OptionButton
                    title="Browse"
                    accessory={UploadIcon}
                  />
                  <Text style={{ textAlign: 'center', color: '#2E8BB7', fontFamily: 'Inter_400Normal', fontSize: 16 }}>Upload</Text>
                </Layout>
              </Layout>
            </Layout>

            <Text style={{paddingLeft:10, paddingBottom:10, fontFamily: 'Inter_400Normal',  color: '#2E8BB7'}}>Most Common</Text>
            <Layout style={styles.formContainer}>
              <CardSimple title='Canadian Pension Plan'/>
              <CardSimple title='Medical Form'/>
            </Layout>
            <Layout style={styles.formContainer}>
              <CardSimple title='Canadian Pension Plan'/>
              <CardSimple title='Medical Form'/>
            </Layout>

            <Layout style={styles.recentform}>
              <Text style={styles.headline}>My Resent Forms</Text>
              <Layout style={styles.formContainer}>
              <CardSimple title='Canadian Pension Plan'/>
              <CardSimple title='Medical Form'/>
            </Layout>
            <Button style={styles.ButtonResent}>View My Form Library</Button>
            </Layout>
          </ScrollView>

        </SafeAreaView>


    </>

  );
};

const styles = StyleSheet.create(
  {
    formContainer:{
      display: 'flex',
      flexDirection: 'row',
      margin: 'auto',
      maxHeight: 200,
      backgroundColor:'none',
      maxWidth:'100%'
    },
    homePage: {
      flex: 1,
      backgroundColor: 'none',
      height: '100%',
      paddingBottom: '20px',
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
    ButtonResent: {
      width: 412,
      heigh: 60,
      borderRadius: 32,
      backgroundColor: '#08415C'
    }
  })