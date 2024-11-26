import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreens = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const slides = [
    {
      key: '1',
      title: 'You Deserve More Time',
      description: 'Filling out forms is time-consuming, repetitive, and confusing. We’re here to help.',
      buttonText: 'I’m Interested',
    },
    {
      key: '2',
      title: 'Upload or Find the Form You Need',
      description: 'Scan a document directly or pick from our library to get started in seconds.',
      buttonText: 'Tell Me More',
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (index === slides.length - 1) {
              navigation.replace('Main'); // Navigate to the main app screen
            } else {
              flatListRef.current.scrollToIndex({ index: index + 1 });
            }
          }}
        >
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnboardingScreens;
