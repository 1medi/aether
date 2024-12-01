import React, { createContext, useState, useContext } from "react";

// Create the context
const TextSizeContext = createContext();

// Provide the context
export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(16); // Default text size

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

// Hook for consuming the context
export const useTextSize = () => useContext(TextSizeContext);
