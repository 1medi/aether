import React from "react";
import { Card, Text, Icon, Layout, Input, Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SectionLibrary({}) {
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
        {/* <View style={styles.section}>
            <View style={{ flexDirection: 'row', 
        alignItems: 'center', }}>
            <Layout style={styles.leftSide}>
                <View style={styles.numbersContainer}>
                <Text style={[styles.numbers, { opacity: 0.5 }]}>0</Text>
                <Text style={styles.numbers}>69</Text>
                </View>
            </Layout>

            <Layout style={styles.rightSide}>
                <View style={{flexDirection: 'row', width: 203, }}>
                <Text style={styles.subText}>
                    Browse from our current library of
                </Text>
                <XIcon/>
                </View>

                <Text style={styles.formsText}>forms</Text>
                
            </Layout>
            </View>
        </View> */}
        <Layout style={styles.searchSection}>
          <View style={styles.searchBar}>
            <View style={styles.barButton}>
              <Input
                style={{
                  width: 346,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 16,
                  borderColor: 1,
                  paddingRight: 8,
                }}
                placeholder="Search for forms..."
              />

              <Button
                accessoryLeft={SearchIcon}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 30,
                  flexShrink: 0, 
                  backgroundColor: "white",
                  
                  
                }}
              />
            
            </View>
            <View style={styles.chipsContainer}>
                <Button style={styles.chips}>Pension</Button>
                <Button style={styles.chips}>Health</Button>
                <Button style={styles.chips}>Tax</Button>
            </View>
          </View>
        </Layout>
      </View>
    </View>
  );
}

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

  section: {
    width: 430,
  },

  leftSide: {
    backgroundColor: "none",
    flexDirection: "row",
    alignItems: "center",
  },

  numbersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  numbers: {
    fontSize: 136,
    letterSpacing: -6.8,
  },

  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "none",
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 24,
  },
  subText: {
    color: "#6D96B7",
    fontSize: 16,
  },
  formsText: {
    color: "#2A374A",
    fontSize: 32,
    fontWeight: "bold",
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
    alignItems: 'center', 
    gap: 8, 
    alignSelf: 'stretch', 
    flexDirection: 'row', 
  }, 

  chips: {
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 24, 
    gap: 8, 
    fontSize: 16, 
    fontWeight: '400', 
  }
});
