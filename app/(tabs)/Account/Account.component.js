import React from "react";
import { ScrollView } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/css/globals";
import Header from "@/components/header/Header";
import ConsoleScreen from "@/components/atoms/ConsoleScreen";

export const AccountScreen = ({ navigation }) => {
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
    <>
      <SafeAreaView style={styles.fullPage} edges={["top", "left", "right"]}>
        <Header title={"Account"} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Layout
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
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
                width: "95%",
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
                backgroundColor: "rgba(194, 50, 51, 0.8)",
                width: "95%",
                borderRadius: 15,
                marginTop: 20,
              }}
              accessoryRight={Trash}
            >
              <Text style={{ color: "white" }}>Delete Account</Text>{" "}
              {/* Don't know why the color won't apply unless i keep this comment here lol */}
            </Button>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = {
  fullPage: {
    flex: 1,
    backgroundColor: colors.apple.offWhite,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 132,
    gap: 8,
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100vw",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(8, 65, 92, 0.60)",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  sectionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Set background color to semi-transparent white
    borderRadius: 15,
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    fontWeight: "300",
    color: "#08415C",
  },
};
