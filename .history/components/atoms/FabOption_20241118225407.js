import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Icon } from "@ui-kitten/components";

const FabOption = ({ iconName, fadeAnim }) => {
    return (
      <Animated.View style={[styles.fabOption, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.fab}>
          <Icon name={iconName} fill="white" style={styles.fabIcon} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  fabOption: {
    marginBottom: 15,
  },
  fab: {
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

export default FabOption;



