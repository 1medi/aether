import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderProfile from '@/components/molecules/Header';
import LibraryButton from '@/components/molecules/FormLibraryButtons'

export default function AutofilledScreen() {
    return(
        <>
<SafeAreaView style={styles.homePage}>

<HeaderProfile />

<Layout style={{ backgroundColor: 'none', paddingLeft: 20, paddingTop: 20, width: 'auto' }}>

  <Text style={styles.headerText}>Canadian Pension Plan </Text>

  <View style={{ backgroundColor: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingTop: 10 }}>



    <View style={styles.buttons}>

      <Pressable style={styles.formButton} onPress={() => navigation.navigate('PensionPlan')} >
        <Layout style={styles.textContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Autofill</Text>
            <ArrowIcon />
          </View>
        </Layout>
      </Pressable>
      <Pressable style={[styles.formButton, { marginLeft: 15 }]} onPress={() => navigation.navigate('')}>
        <Layout style={styles.textContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Simplify</Text>
            <ArrowIcon />
          </View>
        </Layout>
      </Pressable>
    </View>
  </View>

</Layout>

<ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10 }}>
  <Layout style={{ backgroundColor: 'none', }} >
  </Layout>
  

</ScrollView>

</SafeAreaView>
        </>
    ); 
};