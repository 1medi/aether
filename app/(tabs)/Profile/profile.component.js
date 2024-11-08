import React, {useState} from "react";
import { SafeAreaView, Pressable, StyleSheet,  TextInput } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Input,
  Button,
  Icon,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";

import HeaderProfile from "@/components/molecules/Header";

export const ProfileScreen = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({fullName: "", dateOfBirth: "", gender: "", phoneNumber: ""})
    const handleInputChange=(field, value) => {
        setUserInfo({...userInfo, [field]: value});
    }
    const toggleEditMode = () => {
        console.log("toggleEditModeChange")
        setIsEditing(!isEditing)}
  const navigateBack = () => {
    navigation.goBack();
  };

  const Trash = (props) => (
    <Icon
      name="trash-2-outline"
      {...props}
      style={{ width: 25, height: 20, tintColor: "red" }}
    />
  );

  return (
    <LinearGradient colors={["#9FC3E5", "#ffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderProfile />
        <Divider />

        <Layout
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}
        >
         {/* <View> */}
           <Pressable onPress={toggleEditMode}>
            <Text>
                Edit
            </Text>
           </Pressable>
            <Text>
                Full Name
            </Text>
            {isEditing?(<TextInput
                style={styles.input}
                value={userInfo.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
                />
            ): (<Text>{userInfo.fullName}</Text>)}
            <Text>
                {userInfo.fullName}
            </Text>
            <Text>
                {userInfo.dateOfBirth}
            </Text>
        {/* </View> */}

         
        </Layout>
      </SafeAreaView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({input: {fontSize: 16, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#cccccc"}})