import React from 'react';
import { Card, Text, Icon, Layout, } from '@ui-kitten/components';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LibraryButton({ title, subheader }) {
  const navigation = useNavigation();
  
  const ArrowIcon = (props) => (
    <Icon name='arrow-ios-forward-outline' {...props} 
    style={{width:32, height: 32, tint: 'white'}}
    />
  );

  return (
    <Layout style={styles.container}>
   
       <Image 
          style={styles.card}
        source={require('@/assets/images/cardIcon.png')}/>
    
      <TouchableOpacity style={styles.formButton}
        // onPress={ () => navigation.navigate( 'Library' ) }
      >
        
        <Layout style={styles.textContainer}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{title}</Text>
          <ArrowIcon/>
          </View>
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
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',

  },
  card: {
    height: 90,
    width: 90,
    borderRadius: 10,
    objectFit: 'cover',
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
    fontSize: 12,
    color: 'gray',
  },
  arrowIcon: {
    maxHeight: 48,
    maxWidth: 48,
    alignItems: 'center',
  }
});
