import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from "react-native";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from "@ui-kitten/components";
import AppLoading from 'expo-app-loading';
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/app/(tabs)/home.component";
import LandingPage from "@/app/(tabs)/Auth/index";
import LogInPage from "@/app/(tabs)/Auth/LogInPage";
import RegisterPage from "@/app/(tabs)/Auth/RegisterPage";
import { name as appName } from "@/app.json";
import { AppRegistry } from "react-native";
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

const Stack = createNativeStackNavigator();

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.error('Error picking Image: ', error);
    }
  };

  const analyzeAndParaphrase = async () => {
    // Your OCR and paraphrasing logic goes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload or Capture your Form</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300, borderRadius: 20 }}
        />
      )}
      <Button onPress={pickImage} style={styles.text}>Choose a PDF...</Button>
      <Button onPress={analyzeAndParaphrase} style={styles.text}>Analyze & Paraphrase</Button>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalText}>{paraphrasedText || 'No paraphrased text available'}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="LogInPage" component={LogInPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DetectObject" component={DetectObject} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 50,
    marginTop: 100,
    fontFamily: 'Inter_800ExtraBold',
    color: '#2E8BB7'
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
