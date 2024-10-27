import React from 'react';
import { Card, Text, Icon, Button, Layout } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';

export default function LibraryButton({ title, subheader }) { // accept title prop

  const ArrowIcon = (props) => (
    <Icon 
    name="arrow-ios-forward-outline" {...props} 
    style={styles.arrowIcon}
    />
  );

  return (
    <Layout style={{backgroundColor: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Card style={{height: 70, width: 70, borderRadius: 10, marginRight: 13}}>

      </Card>
    <Button style={styles.formButton}>
      <Layout style={{ display:'flex', flexDirection:'column',  }}>
          <Text style={styles.title}>{title}</Text>
          {subheader && <Text style={styles.subheader}>{subheader}</Text>}
      </Layout>
    </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formButton: {
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    height: 70,
    marginBottom: 13,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08415C',
    textAlign: 'left',
    width: '100%'
    

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
