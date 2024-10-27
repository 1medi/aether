import React from 'react';
import { Card, Text, Icon, Button, Layout } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function LibraryButton({ title }) { // accept title prop

  const ArrowIcon = (props) => (
    <Icon 
    name="arrow-ios-forward-outline" {...props} 
    style={styles.arrowIcon}
    />
  );

  return (
    <Button style={styles.formCard} >
      <View style={styles.CardExample}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Button>
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
  arrowIcon: {
    maxHeight: 48,
    maxWidth: 48,
    alignItems: 'center',
    padding: 0,
    margin: 0
  }
});
