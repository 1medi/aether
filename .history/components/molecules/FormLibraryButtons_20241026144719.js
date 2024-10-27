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
    <Layout style={{display: 'flex', flexDirection: 'row', margin: '0'}}>
      <Card style={{height: '60%'}}>

      </Card>
    <Button style={styles.formCard} >
        
          <Text style={styles.title}>{title}</Text>
       
      
    </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 10,
    backgroundColor: '#08415C',
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: 70
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
