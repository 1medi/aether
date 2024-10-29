import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';


export default function CardSimple() {

  const ArrowIcon = (props) => (
    <Icon name="arrow-up" {...props} 
    style={styles.arrowIcon}
    />
  );

  return (
    <Card style={styles.formCard} >
      <View style={styles.CardExample}>
      <ArrowIcon/>
        <Image
          source={require('@/assets/images/form.svg')}
          style={{ width: 32, height: 32, borderRadius: 8, padding:0 }}
        />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Candian Pension Plan</Text>
      </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  formCard:{
    borderRadius: 30,
    padding:0,
    backgroundColor: 'rgba(8, 65, 92, 0.8)',
    display: 'flex',
    flexDirection:'column'
  },
  CardExample: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 75,
    minHeight: 100

  },
  title: {
    fontSize: 12,
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
    transform: [{rotateX: '0deg'}, {rotateZ: '45deg'}],

  }
});

