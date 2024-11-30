import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import { Settings } from 'react-native'; // For storing settings persistently

const SettingsPage = () => {
  const [textSize, setTextSize] = useState(16); // Default text size
  const [language, setLanguage] = useState('English'); // Example language

  // Update global text size whenever the setting is changed
  useEffect(() => {
    const updateTextSize = Settings.get('textSize') || 16;
    setTextSize(updateTextSize);
  }, []);

  const handleTextSizeChange = (size) => {
    setTextSize(size);
    Settings.set({ textSize: size }); // Persist the setting
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Add logic to change the language
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Set Language Section */}
      <Text style={{ fontSize: textSize, marginBottom: 20 }}>Set Language</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
      >
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Spanish" value="Spanish" />
        <Picker.Item label="French" value="French" />
        {/* Add more languages as needed */}
      </Picker>

      {/* Set Text Size Section */}
      <Text style={{ fontSize: textSize, marginTop: 20 }}>Set Text Size</Text>
      <Picker
        selectedValue={textSize}
        onValueChange={(itemValue) => handleTextSizeChange(itemValue)}
      >
        <Picker.Item label="Small" value={12} />
        <Picker.Item label="Medium" value={16} />
        <Picker.Item label="Large" value={20} />
        <Picker.Item label="Extra Large" value={24} />
      </Picker>
    </View>
  );
};

export default SettingsPage;
