// LibraryScreen Component
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import HeaderProfile from '@/components/molecules/Header';
import PopUp from '@/components/atoms/popup';

export default function LibraryScreen() {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const ArrowIcon = (props) => (
    <Icon name='arrow-forward-outline' {...props} style={{ width: 25, height: 20, tint: 'white' }} />
  );

  return (
    <SafeAreaView style={styles.homePage}>
      <HeaderProfile />
      <Layout style={{ paddingLeft: 20, width: 'auto' }}>
        <Text style={styles.headerText}>Canadian Pension Plan</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.navigate('Details')}>
            <Icon name='arrow-circle-left-outline' style={{ width: 30, height: 30, tint: 'white' }} />
          </Pressable>
          <View style={styles.buttons}>
            <PopUp visible={visible} setVisible={setVisible} />
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
      <ScrollView style={{ marginHorizontal: 5, margin: 10 }}>
        <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('@/assets/images/pensionplanform.png')} style={{ width: '100%', resizeMode: 'stretch' }} />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homePage: { flex: 1, backgroundColor: 'none' },
  headerText: { fontSize: 32, fontFamily: 'Inter_400Regular', color: '#08415C' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingTop: 10 },
  buttons: { flexDirection: 'row', alignItems: 'center' },
  formButton: { borderRadius: 12, backgroundColor: '#8EAACD', width: 80, height: 30, marginBottom: 13, justifyContent: 'center' },
  textContainer: { padding: 5 },
  viewContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 10, width: 50, fontWeight: 'bold', color: '#08415C' },
});
