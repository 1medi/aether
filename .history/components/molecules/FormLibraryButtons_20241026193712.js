import React from 'react';
import { Card, Text, Icon, Layout, } from '@ui-kitten/components';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LibraryButton({ title, subheader }) {

  const ArrowIcon = (props) => (
    <Icon
      name="arrow-ios-forward-outline"
      {...props}
    />
  );

  return (
    <Layout style={styles.container}>
       <Image
          source={require('@/assets/images/cardIcon.png')}
        style={styles.card}/>
      
      <TouchableOpacity style={styles.formButton} accessory={ArrowIcon}>
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
    objectFit: 'cover',
  
  },
  formButton: {
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: 'white',
    width: 270,
    height: 80,
    marginBottom: 13,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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
