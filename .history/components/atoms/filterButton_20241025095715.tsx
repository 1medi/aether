import React from 'react';
import * as eva from '@eva-design/eva';
import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

interface ButtonProps {
  title: string,
  accessory: React.ComponentType<any>;
}

export default function filterButton({ title, accessory: Accessory }: ButtonProps) {
  return (

    <View
    >
        <Accessory style={{
         
        }} />
    </View>


  );
}

const styles = StyleSheet.create({


});
