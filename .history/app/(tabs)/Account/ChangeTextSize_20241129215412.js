import React from "react";
import { Slider } from "@react-native-community/slider"; // Install: expo install @react-native-community/slider
import { Layout, Text } from "@ui-kitten/components";
import { Layout, Text } from "react-native";
import { useTextSize } from "./TextSizeContext"; 

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize(); // Get text size state from context

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
      <Slider
        style={{ height: 40 }}
        minimumValue={12} // Minimum font size
        maximumValue={24} // Maximum font size
        step={1} // Increment step
        value={textSize}
        onValueChange={(value) => setTextSize(value)} // Update the text size in context
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
      <Text style={{ marginTop: 16 }}>Current Text Size: {textSize}px</Text>
    </Layout>
  );
};

export default ChangeTextSize;
