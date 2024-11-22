import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors, typography } from "../../css/globals";
import { Layout, Icon, Input } from "@ui-kitten/components";
import { useState, useEffect, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header({
  title,
  greeting,
  hasSearchBar,
  onSearch,
  placeholder,
  noTitle,
  isDarkMode, // Receive dark mode state
}) {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Layout style={styles.headerContainer}>
      {!noTitle && (
        <View style={styles.topSection}>
          <View style={styles.textSection}>
            {greeting ? (
            <>
            <Text style={styles.pageGreeting}>{greeting}!</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            </>
            ) : (
            <Text style={styles.pageTitle}>{title}</Text>
          )}
          </View>
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
            accessoryLeft={
              <Icon
                name="search"
                fill={colors.apple.black}
                width="24"
                height="24"
              />
            }
          />
        </View>
      )}
    </Layout>
  );
}

const getStyles = (isDarkMode) => ({
  headerContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 16,
    // borderBottomColor: colors.apple.lightStroke,
    // borderBottomWidth: 1,
    width: "100%",
  },
  topSection: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 42,
  },

  pageTitle: {
    ...typography(true).h1Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  pageGreeting: {
    ...typography(true).bodyBold,
    color: colors.apple.black,
  },
  date: {
    ...typography(true).footnote,
    color: colors.apple.black,
  },

  profileBorder: {
    padding: 2,
    backgroundColor: colors.apple.white,
    borderWidth: 3,
    borderColor: colors.light.blue,
    borderRadius: 100,
    backgroundColor: "transparent",

  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 100,
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





