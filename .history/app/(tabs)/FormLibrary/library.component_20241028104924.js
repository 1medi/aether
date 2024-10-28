import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Text, Image } from 'react-native';
import HeaderProfile from '@/components/molecules/Header';
import LibraryButton from '@/components/molecules/FormLibraryButtons'

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Another Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
