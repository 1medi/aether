import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Layout } from '@ui-kitten/components';

export default function ModalSimpleUsageShowcase() {

  const DarkModeIcon = (props) => (
    <Icon 
      name="moon-outline" 
      {...props}
      style={styles.darkModeIcon} // Updated style to match the Settings icon
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
    backgroundColor: 'none',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    padding: 16,
  },
  darkModeIcon: {
    width: 24,
    height: 24,
    tintColor: '#08415C', // Same color as the Settings icon
    backgroundColor: '#eef2ff', // Same background color
    padding: 8, // Same padding as the Settings icon
    borderRadius: 12, // Same border radius as the Settings icon
    borderWidth: 1.5,
    borderColor: 'white',
    overflow: 'hidden',
  },
});
