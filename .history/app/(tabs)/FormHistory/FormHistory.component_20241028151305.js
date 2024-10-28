import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon,Card } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text, Image } from 'react-native';
import OptionButton from '@/components/atoms/optionButton'
import DarkModeIcon from '@/components/atoms/darkMode'
import { Input } from '@ui-kitten/components';
import HeaderProfile from '@/components/molecules/Header';

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


export const FormHistoryScreen = ({ navigation }) => {

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
    <Icon 
      name="options-2-outline" 
      {...props} 
      style={styles.filterIcon} // Use consistent style like SettingsIcon
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

      <SafeAreaView style={styles.homePage}>
        <HeaderProfile/>
        
        <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none' }}>
          <Layout style={{ backgroundColor: '', display: 'flex', flexDirection: 'row', padding: 10, }}>
          </Layout>
          <Layout style={{ backgroundColor: 'none', padding: 20, width: 400 }}>
            <Text style={styles.headerText}>Form History</Text>
          </Layout>

          <Layout style={{ backgroundColor: 'none', padding: 10, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Input
              style={{
                borderRadius: 20,
                flex: 1, 
                marginRight: 10, 
              }}
              placeholder='Place your Text'
            />
            <Layout style={styles.iconContainer}>
            <FilterIcon />
              </Layout>
          </Layout>

          <Layout style={styles.cardContainer}>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Home')} 
            >
            <Layout onPress style={styles.formHistoryCard}>
              <Image
              source={require('@/assets/images/lbj.jpg')}
              style={styles.cardImage}
              />
              <Text style={styles.cardText}>Chris Topher</Text>
              </Layout>
            </TouchableOpacity>

            <TouchableOpacity>
            <Layout onPress style={styles.formHistoryCard}>
              <Image
              source={require('@/assets/images/lbj.jpg')}
              style={styles.cardImage}
              />
              <Text style={styles.cardText}>Chris Topher</Text>
              </Layout>
            </TouchableOpacity>

            <TouchableOpacity>
            <Layout onPress style={styles.formHistoryCard}>
              <Image
              source={require('@/assets/images/lbj.jpg')}
              style={styles.cardImage}
              />
              <Text style={styles.cardText}>Chris Topher</Text>
              </Layout>
            </TouchableOpacity>
          </Layout>


        </ScrollView>

      </SafeAreaView>

    </>

  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: 'none',
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Inter_400Regular',
    color: '#08415C',
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
  formHistoryCard: {
    width: 110,  
    height: 140,  
    backgroundColor: 'rgba(8,65,92,0.8)',
    borderRadius: 20,   
    margin: 10,  
    alignItems: 'center', 
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',   
    height: '75%', 
    marginBottom:12,
    resizeMode: 'cover',  
    borderRadius: 20,   
  },
  cardText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',  
    justifyContent: 'center',  
    backgroundColor: 'rgba(0,0,0,0)'
  },
});

