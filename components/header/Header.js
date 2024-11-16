import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors, typography } from "../../css/globals";
import { Layout } from "@ui-kitten/components";

export default function Header({ title, hasSearchBar, onSearch }) {
  return (
    <Layout style={styles.headerContainer}>
      <View style={styles.topSection}>
        <Text style={styles.pageTitle}>{title}</Text>
        <View style={styles.profileBorder}>
          <Image
            style={styles.profileImage}
            source={require("@/assets/images/lbj.jpg")}
          />
        </View>
      </View>
      
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    direction: "column",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: colors.apple.lightStroke,
    borderBottomWidth: 1,
    width: "100%",
  },
  topSection: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  profileBorder: {
    padding: 2,
    borderWidth: 3,
    borderColor: colors.apple.black,
    borderRadius: 100,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  pageTitle: {
    ...typography(true).h1,
    color: colors.apple.black,
  },
});
