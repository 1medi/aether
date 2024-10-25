import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text, Image } from 'react-native';
import OptionButton from '@/components/atoms/optionButton'
import DarkModeIcon from '@/components/atoms/darkMode'
import FilterIcon from '@/components/atoms/filterButton'

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
  const SearchIcon = (props) => (
    <Icon name="search-outline" {...props} />
  );

  const FileTextIcon = (props) => (
    <Icon name={"file-text-outline"} {...props} />
  );

  const UploadIcon = (props) => (
    <Icon name={"upload-outline"} {...props} />
  );

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
        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none' }}>
          <Layout style={{ backgroundColor: '', display: 'flex', flexDirection: 'row', padding: 10, }}>
            <Image
              style={{ width: 75, height: 75, borderRadius: 100, }}
              source={require('@/assets/images/lbj.jpg')}
            />
            <Layout style={{ backgroundColor: 'none', padding: 10 }}>
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18 }}>Chris Topher</Text>
              <Text>
                October, 20 Wed
                {/* {currentDate} */}
              </Text>
            </Layout>
            <Layout style={{ backgroundColor: '', flexDirection: 'row', margin: 'auto', borderLeftWidth: 1.5, borderLeftColor: 'white', height: 40, width: 125 }}>
              <DarkModeIcon style={{ backgroundColor: '' }} />
              <Settings style={{}} />
            </Layout>
          </Layout>

          <Layout style={{ backgroundColor: 'none', padding: 20, width: 400 }}>
            <Text style={styles.headerText}>Form Library</Text>
          </Layout>

          <Layout style={{ backgroundColor: '', flexDirection: 'row', height: 40, borderLeftWidth: 1.5,   }}>
          <Input style={{ borderRadius: '20', width: '80%'}}
              placeholder='Place your Text'
            />
            <FilterIcon
              style={{}}
            />
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