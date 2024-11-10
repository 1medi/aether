import React, { useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import MainFab from "./MainFab";
import FabOption from "./FabOption";

export default function ConsoleScreen() {
  const [expanded, setExpanded] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    setExpanded(!expanded);
    Animated.timing(fadeAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.fabContainer}>
        {expanded && (
            <>
            <FabOption iconName="person-add-outline" fadeAnim={fadeAnim} />
            <FabOption iconName="cloud-upload-outline" fadeAnim={fadeAnim} />
            <FabOption iconName="camera-outline" fadeAnim={fadeAnim} />
            </>
        )}
        <MainFab expanded={expanded} onPress={toggleMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1EBF2",
    justifyContent: "flex-end",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#1F2937",
  },
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 100,
    alignItems: "center",
  },
});



