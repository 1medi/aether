import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
        colors={["#71AFCE", "#5B8399"]} // Lighter color on the left, darker on the right
        start={{ x: 0, y: 0 }}  // Start at the top-left corner
        end={{ x: Math.cos(Math.PI * 63 / 180), y: Math.sin(Math.PI * 63 / 180) }}  // 63-degree angle
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 72, // Ensure width and height are set for circular shape
    height: 72,
    borderRadius: 50,
    overflow: 'hidden', // Keeps the button circular
  },
  buttonGradient: {
    width: 72,  // Match the width and height to the parent container
    height: 72, // Ensures the gradient respects the container's size
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Ensures the gradient is also circular
  },
});
