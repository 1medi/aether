import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { colors, typography } from "../../css/globals";
import { Layout, Icon, Input } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleCancelPress = () => {
    setSearchText("");
    onSearch("");
    setShowCancelButton(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setShowCancelButton(true);
  };

  const handleBlur = () => {
    setShowCancelButton(false);
  };

  return (
    <Layout style={styles.headerContainer}>
      {!noTitle && (
        <View style={styles.topSection}>
          {greeting ? (
            <>
                <View style={styles.profileBorder}>
                  <Image
                    style={styles.profileImage}
                    source={require("@/assets/images/lbj.jpg")}
                  />
                </View>
              <View style={styles.textSection}>
                <Text style={styles.pageGreeting}>{greeting}!</Text>
                <Text style={styles.date}>{formattedDate}</Text>
              </View>
            </>
          ) : (
            <View style={styles.textSection}>
              <Text style={styles.pageTitle}>{title}</Text>
            </View>
          )}
        </View>
      )}
      {hasSearchBar && (
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Input
              style={styles.searchInput}
              placeholder={placeholder}
              value={searchText}
              onChangeText={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              accessoryLeft={
                <Icon
                  name="search"
                  fill={isDarkMode ? colors.apple.white : colors.apple.black}
                  width="24"
                  height="24"
                />
              }
            />
          </View>
          {showCancelButton && (
            <TouchableOpacity
              onPress={handleCancelPress}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
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
    width: "100%",
  },
  topSection: {
    backgroundColor: "transparent",
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 42,
  },
  pageTitle: {
    ...typography(true).h1Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  pageGreeting: {
    ...typography(true).h4Med,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  textSection: {
    ...typography(true).h1,
  },
  date: {
    ...typography(true).footnote,
    color: isDarkMode ? colors.apple.white : colors.apple.black,
  },
  profileBorder: {
    // padding: 2,
    // backgroundColor: colors.apple.white,
    // borderWidth: 3,
    // borderColor: colors.light.blue,
    // borderRadius: 100,
    // backgroundColor: "transparent",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: isDarkMode ? colors.dark.deepWhite20 : colors.apple.white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.apple.lightStroke,
    height: 48,
    flex: 1,
  },
  searchInput: {
    ...typography(true).body,
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: isDarkMode ? colors.dark.darkGrey80 : ''
  },
  cancelButton: {
    paddingLeft: 8,
    justifyContent: "center",
  },
  cancelButtonText: {
    ...typography(true).bodyMed,
    color: colors.apple.black,
  },
});
