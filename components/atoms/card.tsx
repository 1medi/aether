import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function CardSimple() {

  return (
    <Card style={styles.formCard} >
      <View style={styles.CardExample}>
        <Image
          source={require('@/assets/images/clipboard-outline.png')}
          style={{ width: 64, height: 64, borderRadius: 8, padding:0 }}
        />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subheader}>From Code</Text>
        <Text style={styles.body}>Here lies some text about the form</Text>
      </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  formCard:{
    margin:10
  },
  CardExample: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subheader: {
    fontSize: 14,
    color: 'gray',
  },
  body: {
    fontSize: 12
  }
});

