import React from "react";
import { Slider } from "@react-native-community/slider";
import { Layout, Text } from "@ui-kitten/components"; // Use UI Kitten's Text
import { useTextSize } from "./TextSizeContext"; 

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize(); // Get text size state from context

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
bTintColor="#1EB1FC"
      />
      <Text style={{ marginTop: 16 }}>Current Text Size: {textSize}px</Text>
    </Layout>
  );
};

export default ChangeTextSize;
