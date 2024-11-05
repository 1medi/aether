import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Card } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js';
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text, Image } from 'react-native';
import OptionButton from '@/components/atoms/optionButton';
import DarkModeIcon from '@/components/atoms/darkMode';
import { Input } from '@ui-kitten/components';
import HeaderProfile from '@/components/molecules/Header';
import LibraryButton from '@/components/molecules/FormLibraryButtons';
import SearchBar from "@/components/molecules/SearchBar"
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
    return <AppLoading />;
  }

  const FilterIcon = (props) => (
    <Icon 
      name="options-2-outline" 
      {...props} 
      style={styles.filterIcon}
    />
  );

  return (
    <>
      <LinearGradient colors={['#ffffff', '#c4d3ff']} style={{ flex: 1 }}>
        <SafeAreaView style={styles.homePage}>

<HeaderProfile/>


          <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none' }}>
            <Layout style={styles.sectionTitle}>
              <Text style={styles.headerText}>My Form History</Text>
            </Layout>


<SearchBar
placeholder="Search My Saved Profiles"
/>


            <Layout style={styles.cardContainer}>
            <Text>October 2024</Text>
            <LibraryButton title='Crusty Toes' subheader='It’s a taxable benefit that replaces 
part of your income when you retire.' />
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  headerTextContainer: {
    display: 'flex',
  },
  headerName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#08415C',
  },
  headerDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7c93',
  },
  sectionTitle: {
    paddingLeft: 20,
    marginTop: 10,
    backgroundColor:'rgba(0, 0, 0, 0)'
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Inter_400Regular',
    color: '#08415C',

  },
  searchSection: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0)'
  },
  searchInput: {
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
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
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor:'rgba(0, 0, 0, 0)'
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
    marginBottom: 12,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
});
