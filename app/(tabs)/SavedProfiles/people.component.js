import React from "react";
import { SafeAreaView } from "react-native";
import { Divider, Layout, Text, Input, Button, Icon } from "@ui-kitten/components";
import { LinearGradient } from 'expo-linear-gradient';

import HeaderProfile from "@/components/molecules/Header";

export const PeopleScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const Trash = (props) => (
    <Icon name='trash-2-outline' {...props}
      style={{ width: 25, height: 20, tintColor: 'red' }}
    />
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#c4d3ff']} 
      style={{ flex: 1 }} 
    >
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderProfile />
        <Divider />
        
        <Layout
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "transparent"
          }}
        >
          <Text
            category="h1"
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 20,
              alignSelf: 'flex-start',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            Account Information
          </Text>

          {/* Email input */}
          <Input
            style={{
              borderRadius: 20,
              width: 360,
              marginBottom: 20,
            }}
            placeholder="Email"
          />

          {/* Phone input */}
          <Input
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              width: 360,
              marginBottom: 0,
            }}
            placeholder="Phone Number"
          />

          {/* Birthday input */}
          <Input
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              width: 360,
              marginBottom: 0,
            }}
            placeholder="Date of Birth"
          />

          <Button
            appearance="ghost"
            style={{
              backgroundColor: "rgba(173, 216, 230, 0.5)",
              borderRadius: 15,
              width: 250,
              marginTop: 20,
            }}
          >
            Log Out
          </Button>

          <Button
            appearance="ghost"
            style={{ borderWidth: 0, flexDirection: 'row', alignItems: 'center' }} 
            accessoryLeft={Trash}
          >
            <Text style={{ color: 'red' }}>Delete Account</Text> {/* Don't know why the color won't apply unless i keep this comment here lol */}
          </Button>
        </Layout>
      </SafeAreaView>
    </LinearGradient>
  );
};
