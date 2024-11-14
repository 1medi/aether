import React from "react";
import { Card, Text, Icon, Layout, Input, Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LibraryEmpty() {
    return (
        <View style={styles.section}>
            <Text style={styles.heading}>Looking for a form?</Text>
            <Text style={styles.text}>Search our library and let's get you start on the right form. </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    section: {
        justifyContent: 'center', 
        paddingHorizontal: 86, 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 16, 
    }, 

    heading: {
        alignSelf: 'stretch', 
        color: 'rgba(8, 65, 92, 0.60)', 
        textAlign: 'center', 
        fontSize: 24, 
    }, 

    text: {
        textAlign: 'center', 
        color: 'rgba(8, 65, 92, 0.60)', 
        fontSize: 16, 
        lineHeight: 22.4, 
        width: 250, 
    }
})