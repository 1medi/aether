import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon } from '@ui-kitten/components';
import Settings from '@/components/atoms/settings.js'
import DarkModeIcon from '@/components/atoms/darkMode'

const HeaderProfile = () => {
  return (
    <Layout style={{ backgroundColor: '', display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingBottom: 15, }}>
      <Image
        style={{ width: 75, height: 75, borderRadius: 100, }}
        source={require('@/assets/images/lbj.jpg')}
      />
      <View style={{display: 'flex', justifyContent: 'row'}}>
        <Layout style={{ backgroundColor: 'none', padding: 10, }}>
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
      </View>
    </Layout>
  );
};

export default HeaderProfile;