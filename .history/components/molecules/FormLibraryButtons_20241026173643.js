import React from 'react';
import { Card, Text, Icon, Layout, Image } from '@ui-kitten/components';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function LibraryButton({ title, subheader }) {

  const ArrowIcon = (props) => (
    <Icon 
      name="arrow-ios-forward-outline" 
      {...props} 
      style={styles.arrowIcon}
    />
  );

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
       <Image></Image>
      </Card>
      <TouchableOpacity style={styles.formButton}>
        <Layout style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subheader && <Text style={styles.subheader}>{subheader}</Text>}
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 13,
  },
  formButton: {
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: 'white',
    width: 270,
    height: 80,
    marginBottom: 13,
    overflow: 'hidden'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
   
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
  arrowIcon: {
    maxHeight: 48,
    maxWidth: 48,
    alignItems: 'center',
  }
});
