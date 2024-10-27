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
      <Card style={{height: 70, width: 70, borderRadius: 10}}>

      </Card>
    <Button style={styles.formButton}>
      <View style={{ display:'flex', flexDirection:'column'}}>
          <Text style={styles.title}>{title}</Text>
          {subheader && <Text style={styles.subheader}>{subheader}</Text>}
      </View>
    </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formButton: {
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: '#white',
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: 70,

  },
  CardExample: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08415C',
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
