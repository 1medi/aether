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
    width: 80,
    height: 80,
    borderRadius: 40, // Fixed for a circular button
    backgroundColor: colors.other.lightBlue ,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    width: 30,
    height: 30,
  },
});

export default MainFab;





