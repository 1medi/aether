import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

const MainFab = ({ expanded, onPress }) => {

  return (
    <TouchableOpacity style={expanded ? styles.mainFab: styles.subFab} onPress={onPress}>
      <Icon
        name={expanded ? "close-outline" : "plus-outline"}
        fill="white"
        style={styles.fabIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainFab: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: "#71AFCE",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    opacity: '50%'
  },
  subFab: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: "#71AFCE",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
  },
});

export default MainFab;




