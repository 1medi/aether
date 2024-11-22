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
    marginBottom: 16,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: colors.light.blue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android
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

export default FabOption;





