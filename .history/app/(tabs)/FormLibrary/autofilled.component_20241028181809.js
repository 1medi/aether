import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, View, } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderProfile from '@/components/molecules/Header';
import LibraryButton from '@/components/molecules/FormLibraryButtons'

import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';

import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';


export default function AutofilledScreen() {

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    const ArrowIcon = (props) => (
        <Icon name='arrow-forward-outline' {...props}
            style={{ width: 25, height: 20, tint: 'white' }}
        />
    );

    const BackIcon = (props) => (
        <Icon name='arrow-circle-left-outline' {...props}
            style={{ width: 30, height: 30, tint: 'white' }}
        />
    );

    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView style={styles.homePage}>

                <HeaderProfile />

                <Layout style={{ backgroundColor: 'none', paddingLeft: 20, paddingTop: 20, width: 'auto' }}>

                    <Text style={styles.headerText}>Canadian Pension Plan </Text>

                    <View style={{ backgroundColor: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingTop: 10 }}>

                        <Pressable>
                            <BackIcon onPress={() => navigation.navigate('Details')} />
                        </Pressable>

                        <View style={styles.buttons}>

                            <Pressable style={[styles.formButton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('PensionPlan')} >
                                <Layout style={styles.textContainer}>
                                    <View style={styles.viewContainer}>
                                        <Text style={styles.title}>Autofill</Text>
                                        <ArrowIcon />
                                    </View>
                                </Layout>
                            </Pressable>
                            <Pressable style={[styles.formButton, { marginLeft: 15 }]} onPress={() => navigation.navigate('')}>
                                <Layout style={styles.textContainer}>
                                    <View style={styles.viewContainer}>
                                        <Text style={styles.title}>Simplify</Text>
                                        <ArrowIcon />
                                    </View>
                                </Layout>
                            </Pressable>
                        </View>
                    </View>

                </Layout>

                <ScrollView style={{ marginHorizontal: 5, backgroundColor: 'none', margin: 10 }}>
                    <Layout style={{ backgroundColor: 'none', }} >

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 20, 
                            }}>
                            <Image
                                style={{
                                   
                                    resizeMode: 'contain'
                                }}
                                source={require('@/assets/images/pensionplanform.png')} />
                        </View>
                    </Layout>


                </ScrollView>

            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create(
    {
        homePage: {
            flex: 1,
            backgroundColor: 'none'
        },
        headerText: {
            fontSize: 32,
            fontFamily: 'Inter_400Regular',
            color: '#08415C'
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        formButton: {
            borderRadius: 12,
            borderColor: 'transparent',
            backgroundColor: '#8EAACD',
            width: 80,
            height: 30,
            marginBottom: 13,
            overflow: 'hidden',
            alignContent: 'center',

        },

        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: 5,
            backgroundColor: 'none',



        },

        viewContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

        },

        title: {
            fontSize: 10,
            width: 50,
            fontWeight: 'bold',
            color: '#08415C',
        },


    })