import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Layout,
  Button,
  Icon,
  Toggle,
  Divider,
  IndexPath, 
  SelectItem, 
  Select
} from "@ui-kitten/components";

import { useTextSize } from "./TextSizeContext";

const fontSizeOptions = [12, 14, 16, 18, 20, 24]; // Define font size options

const ChangeTextSize = () => {
  const { textSize, setTextSize } = useTextSize();

  const handleSelect = (index) => {
    const selectedSize = fontSizeOptions[index.row];
    setTextSize(selectedSize);
  };

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  return (
    <Layout style={{ padding: 16 }}>
      <Text category="h6" style={{ marginBottom: 16 }}>
        Change Text Size
      </Text>
      <Select
        selectedIndex={{ row: selectedIndex }}
        onSelect={(index) => setSelectedIndex(index)}

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
