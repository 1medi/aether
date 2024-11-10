import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
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

export const PeopleScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const Trash = (props) => (
    <Icon
      name="trash-2-outline"
      {...props}
      style={{ width: 25, height: 20, tintColor: "white" }}
    />
  );

  const Arrow = (props) => (
    <Icon
      name="arrow-ios-forward-outline"
      {...props}
      style={{ width: 25, height: 20, tintColor: "#08415C" }}
    />
  );

  const renderSectionItemTop = (label) => (
    <Button
      appearance="ghost"
      style={styles.sectionItemTop}
      accessoryRight={Arrow}
    >
      <Text style={styles.sectionItemText}>{label}</Text>
    </Button>
  );

  const renderSectionItemBottom = (label) => (
    <Button
      appearance="ghost"
      style={styles.sectionItemBottom}
      accessoryRight={Arrow}
    >
      <Text style={styles.sectionItemText}>{label}</Text>
    </Button>
  );

  const renderSectionItemMiddle = (label) => (
    <Button
      appearance="ghost"
      style={styles.sectionItemMiddle}
      accessoryRight={Arrow}
    >
      <Text style={styles.sectionItemText}>{label}</Text>
    </Button>
  );

  const renderSectionItem = (label) => (
    <Button
      appearance="ghost"
      style={styles.sectionItem}
      accessoryRight={Arrow}
    >
      <Text style={styles.sectionItemText}>{label}</Text>
    </Button>
  );

  return (
    <LinearGradient colors={["#9FC3E5", "#ffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderProfile />
        <Divider />

        <ScrollView>
          <Layout
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
            <Text
              category="h1"
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 20,
                alignSelf: "flex-start",
                width: "100%",
                paddingLeft: 20,
              }}
            >
              Account Information
            </Text>

            <Layout style={styles.section}>
              <Text style={styles.sectionTitle}>Profile Information</Text>
              {renderSectionItemTop("Edit Name")}
              {renderSectionItemMiddle("Update Email")}
              {renderSectionItemBottom("Update Phone Number")}
            </Layout>
            
            <Layout style={styles.section}>
              <Text style={styles.sectionTitle}>Password & Security</Text>
              {renderSectionItem("Change Password")}
            </Layout>

            <Layout style={styles.section}>
              <Text style={styles.sectionTitle}>Language & Region</Text>
              {renderSectionItem("Set Language")}
            </Layout>

            <Layout style={styles.section}>
              <Text style={styles.sectionTitle}>Help & Support</Text>
              {renderSectionItemTop("FAQ")}
              {renderSectionItemMiddle("Contact Support")}
              {renderSectionItemBottom("Report An Issue")}
            </Layout>

            <Button
              appearance="ghost"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: 15,
                width: '95%',
                marginTop: 20,
                boxShadow: "4px 4px 10px 0px rgba(8, 65, 92, 0.10)",
              }}
            >
              Log Out
            </Button>

            <Button
              appearance="ghost"
              style={{
                borderWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: 'rgba(194, 50, 51, 0.8)',
                width: '95%',
                borderRadius: 15,
                marginTop: 20,
              }}
              accessoryRight={Trash}
            >
              <Text style={{ color: "white" }}>Delete Account</Text>{" "}
              {/* Don't know why the color won't apply unless i keep this comment here lol */}
            </Button>
          </Layout>
          <Layout style={{height: 100}}></Layout>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};


const styles = {
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(8, 65, 92, 0.60)",
    marginBottom: 8,
  },
  sectionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Set background color to semi-transparent white
    borderRadius: 15,
    width: '100%',
    marginBottom: 8,
    padding: 15,
    shadowColor: "#08415C",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionItemTop: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Set background color to semi-transparent white
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    marginBottom: 0,
    padding: 15,
    shadowColor: "#08415C",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionItemMiddle: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Set background color to semi-transparent white
    borderRadius: 0,
    width: '100%',
    marginBottom: 0,
    padding: 15,
    shadowColor: "#08415C",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionItemBottom: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Set background color to semi-transparent white
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
    marginBottom: 8,
    padding: 15,
    shadowColor: "#08415C",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionItemText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#08415C",
  },
}


