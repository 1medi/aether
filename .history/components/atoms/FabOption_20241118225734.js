import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Icon } from "@ui-kitten/components";
import { colors, typography } from "@/css/globals";

const FabOption = ({ iconName, fadeAnim }) => {
    return (
      <Animated.View
        style={[
          styles.fabOption,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1], // Slight zoom effect
                }),
              },
            ],
          },
        ]}
      >
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
    borderRadius: 40,
    backgroundColor: colors.other.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.25, // iOS
    shadowRadius: 3.84, // iOS
  },
  fabIcon: {
    width: 30,
    height: 30,
  },
});

export default FabOption;





