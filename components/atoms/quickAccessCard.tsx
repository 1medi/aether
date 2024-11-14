import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

// Define the prop types
interface QuickAccessCardProps {
  description: string;
}

export default function QuickAccessCard({ description }: QuickAccessCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Canadian Pension Plan</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.button}>Start form &gt;</Text>
        </View>
        <Image
          source={require('@/assets/images/previewImage2.png')}
          style={styles.cardImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: 348,
    height: 154,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(240, 243, 245, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 183, 0.2)',
    shadowColor: '#08415C',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cardImage: {
    width: 88,
    height: 118,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 228,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08415C',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(8, 65, 92, 0.6)',
    marginBottom: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08415C',
  },
});