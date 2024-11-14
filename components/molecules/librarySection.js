import React, { useState } from "react";
import { Card, Text, Icon, Layout, Input, Button } from "@ui-kitten/components";
import { StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

export default function SectionLibraryTop({ onSelect }) {

  const handleChipSelect = (chipName) => {
    onSelect(chipName);
  };

  const SearchIcon = (props) => (
    <Icon
      name="search-outline"
      {...props}
      style={{ width: 24, height: 24, tintColor: 'black' }}
    />
  );

  return (
    <View style={styles.pageContent}>
      <Layout style={styles.header}>
        <Text style={styles.headerText}>Form Library</Text>
      </Layout>

      <View style={styles.content}>
        <Layout style={styles.searchSection}>
          <View style={styles.searchBar}>
            <View style={styles.barButton}>
              <Input
                style={{
                  width: '80%',
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 16,
                  borderColor: 1,
                  paddingRight: 8,
                  backgroundColor: 'rgba(240, 243, 245, 0.60)', 
                  color: 'rgba(8, 65, 92, 0.60)', 
                  borderWidth: 1, 
                  borderColor: 'rgba(46, 139, 183, 0.20)',
                  color: 'rgba(46, 139, 183, 0.20)', 
                  shadowColor: "rgba(8, 65, 92, 1)",
                  shadowOffset: { width: 4, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                }}
                placeholder="Search form library..."
              />

              <Button
                accessoryLeft={SearchIcon}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 30,
                  flexShrink: 0, 
                  backgroundColor: "rgba(240, 243, 245, 0.60)",
                  stroke: 'rgba(46, 139, 183, 0.20)',
                  borderWidth: 1, 
                  borderColor: 'rgba(46, 139, 183, 0.20)',
                  color: 'rgba(46, 139, 183, 0.20)', 
                  shadowColor: "rgba(8, 65, 92, 1)",
                  shadowOffset: { width: 4, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                }}
              />
            </View>
            <ScrollView horizontal={true} style={styles.chipsContainer}>
              {["All", "Pension", "Health", "Taxes"].map((chip) => (
                <ChipButton key={chip} label={chip} onPress={() => handleChipSelect(chip)} />
              ))}
            </ScrollView>
          </View>
        </Layout>
      </View>
    </View>
  );
}

const ChipButton = ({ label, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
    onPress(label);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.chips, isPressed && styles.chipPressed]}>
      <Text style={[styles.chipText, isPressed && styles.chipTextPressed]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: 430,
    alignItems: 'center',
  },
  header: {
    height: 112,
    paddingTop: 56,
    paddingRight: 198,
    paddingBottom: 9,
    paddingLeft: 16,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "none",
  },
  headerText: {
    fontSize: 36,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  searchSection: {
    width: 430,
    flexDirection: "column",
    gap: 8,
    backgroundColor: "none",
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  searchBar: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 16,
    alignItems: "center",
  },
  barButton: {
    backgroundColor: "none",
    flexDirection: "row",
    width: 398,
    height: 44,
  },
  chipsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  chips: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'rgba(240, 243, 245, 0.60)',
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 183, 0.20)',
  },
  chipPressed: {
    backgroundColor: '#08415C', 
  },
  chipText: {
    
  },
  chipTextPressed: {
    color: '#F0F3F5',
    
  },
});
