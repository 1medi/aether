import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import DarkModeIcon from '@/components/atoms/darkMode'

const HeaderProfile = () => {

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'short' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);
  
  return (
    <Layout style={{ backgroundColor: 'transparent', paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 75, height: 75, borderRadius: 100, }}
          source={require('@/assets/images/lbj.jpg')}
        />
        <View style={{ marginLeft: 10 }}>
          <Layout style={{ backgroundColor: 'none', padding: 10, }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18 }}>Chris Topher</Text>
            <Text>
              {currentDate}
            </Text>
          </Layout>
        </View>
        <Layout style={{ backgroundColor: '', flexDirection: 'row', borderLeftWidth: 1.5, borderLeftColor: 'white', height: 40, width: 50, alignItems: 'center', justifyContent: 'flex-end', paddingLeft: 50}}>
          {/* <DarkModeIcon style={{ backgroundColor: '' }} /> */}
        </Layout>
        </View>
    </Layout>
  );
};

export default HeaderProfile;