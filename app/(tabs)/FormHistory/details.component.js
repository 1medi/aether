import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';


export const DetailsScreen = ({ navigation }) => {
  
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>I LOVE DESIGN TEST DEVELOP</Text>
      </Layout>
    </SafeAreaView>
  );
};

