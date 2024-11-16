import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors, typography } from "../../css/globals";

export default function Header({ title }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.pageTitle}>{title}</Text>
      <Image
        style={styles.profileImage}
        source={require("@/assets/images/lbj.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: colors.apple.lightStroke,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.apple.black,
  },
  pageTitle: {
    ...typography(true).h1,
    color: colors.apple.black,
  },
});
