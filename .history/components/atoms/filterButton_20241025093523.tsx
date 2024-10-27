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

export default function Buddon({ title, accessory: Accessory }: ButtonProps) {
  return (

    <View
      style={styles.buttonGradient}
    >
        <Accessory style={{
          width: 20,
          height: 20,
          tintColor: '#ffffff'
        }} />
    </View>


  );
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 8,
    color: 'white',
    padding: 5,
  },
  button: {
    flexDirection: 'column',
    alignContent: 'center',
    margin: 10,
    borderRadius: 50,
    width: 100,
    height: 100,

  },
  buttonGradient: {
    borderRadius: 50,
    opacity: .65,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#08415C'
  },
});
