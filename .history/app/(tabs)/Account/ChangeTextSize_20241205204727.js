import React from "react";
import { selectedIndex } from 'react-native';
import { Layout, Text, Select, SelectItem } from "@ui-kitten/components"; // UI Kitten components
import { useTextSize } from "./TextSizeContext";

const fontSizeOptions = [12, 14, 16, 18, 20, 24]; // Define font size options

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize();

  const handleSelect = (index) => {
    const selectedSize = fontSizeOptions[index.row];
    setTextSize(selectedSize);
  };

  const selectedIndex = fontSizeOptions.indexOf(textSize); // Find the current size's index

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
      <Select
        selectedIndex={{ row: selectedIndex }}
        onSelect={handleSelect}
        value={`${textSize}px`}
      >
        <SelectItem title="Reset to Default (16px)" />
        {fontSizeOptions.map((size) => (
          <SelectItem key={size} title={`${size}px`} />
        ))}
      </Select>
      <Text style={{ marginTop: 16 }}>Current Text Size: {textSize}px</Text>
    </Layout>
  );
};

export default ChangeTextSize;
