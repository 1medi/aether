import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function CardSimple() {

  const ArrowIcon = (props) => (
    <Icon name="arrow-up" {...props} style={styles.arrowIcon} />
  );

  return (
    <Card style={styles.formCard}>
      <View style={styles.CardExample}>
        <Image
          source={require('@/assets/images/health.png')}
          style={styles.cardImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Canadian Pension Plan</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 16,
    width: 146,            // Keep the width as it was
    height: 141,           // Keep the height as it was
    padding: 0,            // No extra padding to keep card size
    backgroundColor: '#F0F3F5',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 183, 0.2)',  // 20% opacity for #2E8BB7
    shadowColor: '#08415C',  // Use a darker shadow color for a stronger effect
    shadowOffset: { width: 0, height: 6 },    // Increased vertical offset for a more pronounced shadow
    shadowOpacity: 0.3,     // Increased opacity to make the shadow darker
    shadowRadius: 12,      // Increased blur radius for a softer shadow
    elevation: 6,          // Increased elevation for a more pronounced shadow on Android
  },
  CardExample: {
    flexDirection: 'column',
    alignItems: 'center',   // Keep content centered
    justifyContent: 'center',  // Center content vertically
    height: '100%',          // Make sure content fills the height of the card
    padding: 4,              // Add some padding to prevent content from touching edges
  },
  cardImage: {
    width: 120,             // Adjust the image width to fit inside the card
    height: 100,            // Adjust the image height to fit the available space
    borderRadius: 16,
    marginBottom: 8,        // Space between the image and the text
  },
  textContainer: {
    alignItems: 'center',   // Center the text horizontally
  },
  title: {
    fontSize: 12,           // Keep the font size as it was
    fontWeight: 'bold',
    color: '#08415C',
    textAlign: 'center',    // Center the text
  },
  arrowIcon: {
    maxHeight: 48,
    maxWidth: 48,
    transform: [{ rotateX: '0deg' }, { rotateZ: '45deg' }],
  }
});
