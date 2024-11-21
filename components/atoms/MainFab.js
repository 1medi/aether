import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";

const MainFab = ({ expanded, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.fab,
        expanded && { opacity: 0.5 }, // Add opacity dynamically when expanded
      ]}
      onPress={onPress}
    >
      <Icon
        name={expanded ? "close-outline" : "plus-outline"}
        fill="white"
        style={styles.fabIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 64,
    height: 64,
    borderRadius: 100, // Fixed for a circular button
    backgroundColor: colors.light.blue ,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: colors.light.black20,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  fabIcon: {
    width: 24,
    height: 24,
  },
});

export default MainFab;





