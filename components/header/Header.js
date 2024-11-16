import React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import { colors, typography } from "../../css/globals";
import { Layout, Icon } from "@ui-kitten/components";

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

      {hasSearchBar && (
        <View style={styles.searchContainer}>
          <Icon name="search" fill={colors.apple.black} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find the form you need"
            onChangeText={onSearch}
          />
        </View>
      )}
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

  searchContainer: {
    backgroundColor: colors.apple.glass70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    height: 48,
  },
  searchInput: {
    ...typography(true).body,
    paddingHorizontal: 8,
    flex: 1,
  },
});
