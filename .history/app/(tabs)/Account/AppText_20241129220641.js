import React from "react";
import { Text } from "react-native";
import { useTextSize } from "./TextSizeContext";

const AppText = ({ style, children, ...props }) => {
  const { textSize } = useTextSize(); // Get the current text size from context

  return (
    <Text
      {...props}
      style={[{ fontSize: textSize }, style]} // Dynamically set font size
    >
      {children}
    </Text>
  );
};

export default AppText;
