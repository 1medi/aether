import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextSizeContext = createContext();

export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(16); // Default size

  // Load saved text size on app startup
  useEffect(() => {
    const loadTextSize = async () => {
      const savedSize = await AsyncStorage.getItem("textSize");
      if (savedSize) setTextSize(Number(savedSize));
    };
    loadTextSize();
  }, []);

  // Save text size whenever it changes
  useEffect(() => {
    AsyncStorage.setItem("textSize", textSize.toString());
  }, [textSize]);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export const useTextSize = () => useContext(TextSizeContext);
