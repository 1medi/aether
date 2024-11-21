import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("darkMode");
        if (savedMode !== null) {
          setDarkMode(JSON.parse(savedMode));
        }
      } catch (error) {
        console.error("Error loading dark mode:", error);
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    try {
      setDarkMode((prev) => {
        const newMode = !prev;
        AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
        return newMode;
      });
    } catch (error) {
      console.error("Error saving dark mode:", error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
