import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

export default function LibraryButton({ title, subheader, footnote, isImportant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.contentContainer}>
        
        {/* File Icon with Star Overlay */}
        <View style={styles.iconContainer}>
          <Image
            style={styles.fileIcon}
            source={require('@/assets/images/previewImage2.png')}  
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
          <Text style={styles.footnote}>{footnote}</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(240, 243, 245, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 183, 0.2)',  // 20% opacity for #2E8BB7
    shadowColor: '#08415C',  // Use a darker shadow color for a stronger effect
    shadowOffset: { width: 4, height: 4 },    // Increased vertical offset for a more pronounced shadow
    shadowOpacity: 0.1,     // Increased opacity to make the shadow darker
    shadowRadius: 10,      // Increased blur radius for a softer shadow
    elevation: 5,     
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
  },
  fileIcon: {
    width: 48,
    height: 60,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08415C',
  },
  subheader: {
    fontSize: 16,
    color: '#08415C',
  },
  footnote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(8, 65, 92, 0.6)',
    marginTop: 4,
  },
  dotsIcon: {
    width: 24,
    height: 24,
  },
});
