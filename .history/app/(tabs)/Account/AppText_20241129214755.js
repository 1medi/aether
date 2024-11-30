import React from "react";
import { Text as UIKittenText } from "@ui-kitten/components";
import { useTextSize } from "./TextSizeContext";

const AppText = ({ style, ...props }) => {
  const { textSize } = useTextSize();

  return (
    <UIKittenText
      {...props}
      style={[{ fontSize: textSize }, style]} // Merge the dynamic text size with any additional styles
    />
  );
};

export default AppText;
