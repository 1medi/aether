import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function LibraryButton({ title }) { // accept title prop

  const ArrowIcon = (props) => (
    <Icon 
    name="arrow-ios-forward-outline" {...props} 
    style={styles.arrowIcon}
    />
  );

  return (
    <Card style={styles.formCard} accessoryLeft={ArrowIcon}>
      <View style={styles.CardExample}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 30,
    padding: 0,
    backgroundColor: '#08415C',
    display: 'flex',
    flexDirection: 'column'
  },
  CardExample: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subheader: {
    fontSize: 14,
    color: 'gray',
  },
  body: {
    fontSize: 12
  },

  
});
