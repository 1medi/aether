import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors, typography } from "../../css/globals";
import { Layout, Icon, Input } from "@ui-kitten/components";
import { useState, useEffect, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header({
  title,
  hasSearchBar,
  onSearch,
  placeholder,
  noTitle,
  isDarkMode, // Receive dark mode state
}) {

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  return (
    <Layout style={styles.headerContainer}>
      {!noTitle && (
        <View style={styles.topSection}>
          <Text style={styles.pageTitle}>{title}</Text>
          <View style={styles.profileBorder}>
            <Image
              style={styles.profileImage}
              source={require("@/assets/images/lbj.jpg")}
            />
          </View>
        </View>
      )}
      {hasSearchBar && (
        <View style={styles.searchContainer}>
          <Input
            style={styles.searchInput}
            placeholder={placeholder}
            onChangeText={onSearch}
            accessoryLeft={<Icon name="search" fill={colors.apple.black} />}
          />
        </View>
      )}
    </Layout>
  );
}

const getStyles = (isDarkMode) => ({
  headerContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderBottomColor: colors.apple.lightStroke,
    borderBottomWidth: 1,
    width: "100%",
  },
  topSection: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 42,
  },
  profileBorder: {
    padding: 2,
    backgroundColor: colors.apple.white,
    borderWidth: 3,
    borderColor: colors.light.deepBlue,
    borderRadius: 100,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  pageTitle: {
    ...typography(true).h2Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },

  searchContainer: {
    backgroundColor: colors.apple.white,
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    height: 48,
  },
  searchInput: {
    ...typography(true).body,
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});





