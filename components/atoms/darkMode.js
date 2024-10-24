import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Icon, Text, Layout } from '@ui-kitten/components';

export default function ModalSimpleUsageShowcase() {

  const DarkModeIcon = (props) => (
    <Icon name="moon-outline" {...props}
    style={{width: 40, height: 40, margin: 'auto', color:'#08415C', backgroundColor:'#eef2ff', padding:20, borderRadius: 20, overflow: 'hidden', background: 'transparent', borderWidth: 1.5, borderColor: 'white'}}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <View style={styles.header}>
          <DarkModeIcon />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'flex-start', 
    backgroundColor:'none',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',  

  },
});
