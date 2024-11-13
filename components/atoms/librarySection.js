import React from 'react';
import { Card, Text, Icon, Layout, Input } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SectionLibrary() {

    const SearchIcon = (props) => (
        <Icon
          name="search-outline"
          {...props}
          style={{ width: 24, height: 24, tint: "black", }}
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
                <Layout style={styles.inputGroup}>
                    <Input
                    style={{width: 346, height: 44, flexShrink: 0, borderRadius: 16, border: 1}}
                    placeholder='Search for forms...'
                    />
                    <SearchIcon/>
                </Layout>

                <View style={styles.chips}>
                    
                </View>
                </View>
        </Layout>
      </View>
    </View>
    )
}; 

const styles = StyleSheet.create({

    pageContent: {      
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 16, 
        width: 430, 

    }, 
    header: {
        display: 'flex', 
        height: 112, 
        paddingTop: 56,
        paddingRight: 198,
        paddingBottom: 9,
        paddingLeft: 16,
        alignItems: 'center', 
        alignSelf: 'stretch', 
        backgroundColor: 'none',
    }, 
    
    headerText: {
        fontSize: 36, 
        lineHeight: 'normal', 
    }, 
    content: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 32, 
    },


    section: {
        width: 430, 
    }, 

    leftSide: {
        backgroundColor: 'none',
        flexDirection: 'row', 
        alignItems: 'center', 
    },

    numbersContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 

    numbers: {
     fontSize: 136, 
     letterSpacing: -6.8, 

    }, 

    rightSide: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'none',
        paddingRight: 8, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        gap: 24, 
    },
    subText: {
        color: '#6D96B7',
        fontSize: 16,
        
    },
    formsText: {
        color: '#2A374A',
        fontSize: 32,
        fontWeight: 'bold',
    },

    searchSection: {
        width: 430, 
        paddingHorizontal: 16, 
        paddingVertical: 0 ,
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 8, 
        backgroundColor: 'none', 
    }, 

    searchBar: {
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        gap: 16, 
        alignSelf: 'stretch', 
    }, 

    inputGroup: {
        backgroundColor: 'none', 
        flexDirection: 'row', 
        alignItems: 'center', 
    }
});
