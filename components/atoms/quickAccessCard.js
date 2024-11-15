import React from 'react';
import { Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import { colors, typography } from '@/css/globals';

export default function QuickAccessCard({ title, description }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
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
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.apple.glass70,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardImage: {
    width: 88,
    height: 110,
    shadowColor: colors.apple.black20,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'show',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 228,
  },
  title: {
    ...typography(true).h4Med,
    marginBottom: 8,
  },
  description: {
    ...typography(true).footnote,
    color: colors.apple.secondaryText,
    marginBottom: 16,
  },
  button: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
  },
});