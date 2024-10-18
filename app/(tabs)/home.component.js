import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import CardSimple from '@/components/atoms/card';
import { StyleSheet, Text } from 'react-native';

export const HomeScreen = ({ navigation }) => {


  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{marginHorizontal: 20}}>
      <Layout>
      <Settings style={{margin: 200}}/>
      </Layout>

      <Layout>
       <Text>Hello Chris!</Text> 
       <Text> Need help Simplyfyin a form?</Text> 
      </Layout>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <CardSimple/>
        <CardSimple/>
        <CardSimple/>
        <CardSimple/>
        <CardSimple/>
        <CardSimple/>
      </Layout>
      </ScrollView>

    </SafeAreaView>
  );
};