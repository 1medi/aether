import React, { useState } from "react";
import { Layout, Text, Select, SelectItem, IndexPath } from "@ui-kitten/components"; // Include IndexPath
import { useTextSize } from "./TextSizeContext";

const fontSizeOptions = [14, 16, 18, 20]; // Define font size options
const defaultTextSize = 16; // Default size

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize();
  
  // Initialize selectedIndex with an IndexPath object
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(fontSizeOptions.indexOf(textSize)));

  const handleSelect = (index) => {
    setSelectedIndex(index); // Update selectedIndex
    const selectedSize = fontSizeOptions[index.row]; // Get font size from the row index
    setTextSize(selectedSize); // Update textSize
  };

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
      <Select
        selectedIndex={selectedIndex} // Pass the IndexPath object
        onSelect={handleSelect} // Handle selection
        value={`${fontSizeOptions[selectedIndex.row]}px`} // Display current value
      >
        {fontSizeOptions.map((size) => (
          <SelectItem key={size} title={`${size}px`} />
        ))}
      </Select>
      <Text style={{ marginTop: 16 }}>Current Text Size: {textSize}px</Text>
    </Layout>
  );
};

export default ChangeTextSize;
