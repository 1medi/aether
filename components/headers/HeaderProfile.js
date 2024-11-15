import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { colors, typography } from '../../css/globals';

export default function HeaderProfile() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'short' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <Layout style={styles.headerContainer}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.profileImage}
          source={require('@/assets/images/lbj.jpg')}
        />
        <View style={styles.textContainer}>
            <Text style={styles.profileName}>Hi, Chris Topher!</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  body: {

  },
  bodyBold: {
    ...typography(true).bodyBold,
  },

  headerContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomColor: colors.light.lightStroke,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  profileName: {
    ...typography(true).bodyBold,
    color: colors.light.deepBlue,
  },
  dateText: {
    ...typography(true).body,
    color: colors.light.deepBlue,
  },
});