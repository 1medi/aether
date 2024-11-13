import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface BuddonProps {
  title: string;
  destination: string; 
  accessory: React.ComponentType<any>;
}

export default function Buddon({ title, accessory: Accessory, destination }: BuddonProps) {
  const navigation = useNavigation();  

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => navigation.navigate(destination)} 
    >
      <LinearGradient
        colors={["71AFCE", "5B8399"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonGradient}
      >
        <Accessory 
          style={{
            width: 40,
            height: 40,
            tintColor: '#ffffff',
          }} 
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden', // Ensures the gradient is fully circular
    marginLeft: 15,
    marginRight: 20,
  },
  buttonGradient: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
