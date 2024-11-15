import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import { colors, typography } from '@/css/globals';

export default function Button({ buttonTitle, buttonDesc, accessory: Accessory, destination }) {
  const navigation = useNavigation();

  return (
    <BlurView intensity={16} style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.touchContainer}
        onPress={() => navigation.navigate(destination)}
      >
        <Layout style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{buttonTitle}</Text>
            <Text style={styles.buttonDesc}>{buttonDesc}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Accessory
              style={{
                width: 40,
                height: 40,
                tintColor: '#ffffff',
              }}
            />
            </View>
        </Layout>
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: colors.apple.glass20,
    overflow: "hidden",
  },
  touchContainer: {
    backgroundColor: "transparent",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    gap: 8,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  textContainer: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
  },
  buttonTitle: {
    ...typography(true).h4,
    color: colors.apple.white,
  },
  buttonDesc: {
    ...typography(true).footnote,
    color: colors.apple.glass70,
  },
});