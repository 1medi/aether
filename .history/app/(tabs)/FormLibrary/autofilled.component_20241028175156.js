import React from "react";
import { View,  StyleSheet, Text, Image, SafeAreaView, ScrollView, View } from "react-native";
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';

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