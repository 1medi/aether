import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

export default function LibraryButton({ title, subheader, isImportant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.contentContainer}>
        
        {/* File Icon with Star Overlay */}
        <View style={styles.iconContainer}>
          <Image
            style={styles.fileIcon}
            source={require('@/assets/images/file_img.png')}  
          />
          {isImportant && (
            <Icon
              name="star"
              style={styles.starIcon}
              fill="#2E8BB7"
            />
          )}
        </View>
        
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subheader}>{subheader}</Text>
        </View>

        {/* Three-dot Menu Icon */}
        <Image
          style={styles.dotsIcon}
          source={require('@/assets/images/3_points_icon.png')} 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F5',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 8,
    shadowColor: '#08415C',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 10,
  },
  fileIcon: {
    width: 45,
    height: 45,
  },
  starIcon: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 18,
    height: 18,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08415C',
  },
  subheader: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  dotsIcon: {
    width: 24,
    height: 24,
  },
});
