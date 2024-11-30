import React, { createContext, useState, useContext } from "react";

const TextSizeContext = createContext();

export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(16); // Default text size

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export const useTextSize = () => useContext(TextSizeContext);
