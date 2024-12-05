import React, { useState } from "react";
import { Layout, Text, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { useTextSize } from "./TextSizeContext";

const fontSizeOptions = [ 14, 16, 18, 20, ]; // Define font size options
const defaultTextSize = 16; // Default size

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize();

  // Include "Reset to Default" in fontSizeOptions and initialize selectedIndex
  const extendedFontSizeOptions = ["Reset to Default", ...fontSizeOptions];
  const initialIndex = fontSizeOptions.indexOf(textSize);
  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(initialIndex !== -1 ? initialIndex + 1 : 0)
  );

  const handleSelect = (index) => {
    if (index.row === 0) {
      // Reset to default size
      setTextSize(defaultTextSize);
    } else {
      // Update text size to the selected option
      const selectedSize = fontSizeOptions[index.row - 1];
      setTextSize(selectedSize);
    }
    setSelectedIndex(index); // Update selectedIndex
  };

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
      <Select
        selectedIndex={selectedIndex} // Pass the IndexPath object here
        onSelect={handleSelect} // Handle selection
        value={
          selectedIndex.row === 0
            ? "Reset to Default"
            : `${fontSizeOptions[selectedIndex.row - 1]}px`
        }
      >
        {extendedFontSizeOptions.map((size, index) =>
          typeof size === "string" ? (
            <SelectItem key={index} title={size} />
          ) : (
            <SelectItem key={size} title={`${size}px`} />
          )
        )}
      </Select>
      <Text style={{ marginTop: 16 }}>Current Text Size: {textSize}px</Text>
    </Layout>
  );
};

export default ChangeTextSize;