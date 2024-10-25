import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const FolderScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details Page</Text>
      </Layout>
    </SafeAreaView>
  );
};