import React from 'react';
import * as eva from '@eva-design/eva';
import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { View, Text,  StyleSheet, Image} from 'react-native';

const CameraIcon = () => (
  <Image
    source={require('@/assets/images/camera-outline.png')}
    style={{ width: 32, height: 32, borderRadius: 8 }}
  />
);

interface BuddonProps {
  title: string,
  accessory: React.ComponentType<any>;
}

export default function Buddon({ title, accessory: Accessory }: BuddonProps) {
  return (
    <Button
      accessoryLeft={Accessory}
      style={styles.button}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 8,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 20,
    width: 200,
    margin: 10,
    backgroundColor: '#5C8CC6',
    borderColor: '#5C8CC6'
  }
});
