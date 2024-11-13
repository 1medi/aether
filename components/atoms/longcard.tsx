import React from 'react';
import { Card, Text, Icon, Button } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function LongCard() {

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
        {/* Button on the right side */}
        <Button
          style={styles.button}
          appearance="ghost"
          size="giant"
          onPress={() => {}}
        >
          ...
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 24,
    padding: 0,
    backgroundColor: '#F0F3F5',
    display: 'flex',
    flexDirection: 'row', // Horizontal layout
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 183, 0.2)',  // 20% opacity for #2E8BB7
    shadowColor: '#08415C',   // Shadow color
    shadowOffset: { width: 4, height: 4 }, // Shadow position (x: 4, y: 4)
    shadowOpacity: 0.10, // Shadow opacity
    shadowRadius: 10,    // Shadow blur
    elevation: 5,        // For Android shadow effect
    width: 398,          // Card width
    height: 85,          // Card height
  },
  CardExample: {
    flexDirection: 'row',  // Row layout for horizontal card
    alignItems: 'center',  // Align items centrally
    width: '100%',         // Take up the full width of the card
    paddingHorizontal: 12, // Add padding for spacing inside card
    gap: 16,               // Adds space between image and text
    justifyContent: 'center', // Centers content horizontally
  },
  cardImage: {
    width: 50,             // Adjust width of image to fit inside card
    height: 50,            // Adjust height to match the card size
    borderRadius: 16,
    marginRight: 12,       // Space between image and text
  },
  textContainer: {
    flex: 1,               // This ensures the text container takes the available space
    justifyContent: 'center', // Vertically center the text
  },
  title: {
    fontSize: 14,          // Adjust font size to fit within the available space
    fontWeight: 'bold',
    color: '#08415C',
    textAlign: 'left',     // Align text to the left instead of center
    flexWrap: 'wrap',      // Allow text to wrap and avoid overflow
  },
  button: {
    paddingHorizontal: 0,  // No padding for the button
    paddingVertical: 0,    // No padding for the button
    minWidth: 0,           // Ensure button doesn't take extra width
    height: 40,            // Larger button height
    marginLeft: 'auto',    // Align button to the right
  },
  subheader: {
    fontSize: 14,
    color: 'gray',
  },
  body: {
    fontSize: 12,
  },
  arrowIcon: {
    maxHeight: 48,
    maxWidth: 48,
    transform: [{ rotateX: '0deg' }, { rotateZ: '45deg' }],
  }
});
