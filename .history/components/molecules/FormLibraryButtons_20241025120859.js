import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';


export default function LibraryButton() {

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
          style={{ width: 64, height: 64, borderRadius: 8, padding:0 }}
        />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  formCard:{
    borderRadius: 30,
    padding:0,
    backgroundColor: '#08415C',
    display: 'flex',
    flexDirection:'column'
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
    transform: [{rotateX: '0deg'}, {rotateZ: '45deg'}],
    alignItems: 'center',
    padding: 0,
    margin: 0
  }
});

