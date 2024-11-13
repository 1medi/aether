import React, { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, TextInput, Text, StyleSheet, Image, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LibraryButton from "@/components/molecules/FormLibraryButtons";
import { LinearGradient } from "expo-linear-gradient";

export const FormHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState("Forms");
  const [importantCardId, setImportantCardId] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigation = useNavigation();

  const forms = [
    { id: 1, title: "Pension Plan Application", subheader: "Modified Oct 28, 2024 - Draft", status: "In progress" },
    { id: 2, title: "Pension Plan Application", subheader: "Modified Oct 16, 2024 - Draft", status: "In progress" },
    { id: 3, title: "Pension Plan Application", subheader: "Modified Jan 5, 2023 - Complete", status: "Complete" },
  ];

  const profiles = [
    { id: 1, name: "Chris Topher", role: "Myself" },
    { id: 2, name: "Sarah O'Neil", role: "Care Recipient" },
    { id: 3, name: "Pat Rick", role: "Grandpa" },
  ];

  const handleCardPress = (id) => {
    setImportantCardId(id);
  };

  const handleCardLongPress = () => {
    navigation.navigate('/');
  };

  const renderForms = () => {
    const filteredForms = forms.filter((form) => {
      if (filter === "In progress") return form.status === "In progress";
      if (filter === "Complete") return form.status === "Complete";
      return true;
    });

    return (
      <ScrollView style={styles.scrollView}>
        {filteredForms.some((form) => form.status === "In progress") && (
          <Text style={styles.sectionHeader}>October, 2024</Text>
        )}
        {filteredForms
          .filter((form) => form.status === "In progress")
          .map((form) => (
            <LibraryButton
              key={form.id}
              title={form.title}
              subheader={form.subheader}
              isImportant={importantCardId === form.id}
              onPress={() => handleCardPress(form.id)}
              onLongPress={handleCardLongPress}
            />
          ))}
        {filteredForms.some((form) => form.status === "Complete") && (
          <>
            <Text style={styles.sectionHeader}>September, 2024</Text>
            {filteredForms
              .filter((form) => form.status === "Complete")
              .map((form) => (
                <LibraryButton
                  key={form.id}
                  title={form.title}
                  subheader={form.subheader}
                  isImportant={importantCardId === form.id}
                  onPress={() => handleCardPress(form.id)}
                  onLongPress={handleCardLongPress}
                />
              ))}
          </>
        )}
      </ScrollView>
    );
  };

  const renderProfiles = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.profileContainer}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileCard}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileRole}>{profile.role}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderChips = () => {
    const chips = ["Newest", "Important", "In progress", "Complete"];

    return (
      <FlatList
        data={chips}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.chip, filter === item && styles.activeChip]} onPress={() => setFilter(item)}>
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <LinearGradient colors={["#9FC3E5", "#ffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Toggle Tabs */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab === "Forms" && styles.activeToggleButton]}
            onPress={() => setActiveTab("Forms")}
          >
            <Text style={[styles.toggleButtonText, activeTab === "Forms" && styles.activeToggleButtonText]}>Forms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab === "Profiles" && styles.activeToggleButton]}
            onPress={() => setActiveTab("Profiles")}
          >
            <Text style={[styles.toggleButtonText, activeTab === "Profiles" && styles.activeToggleButtonText]}>Profiles</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Search ${activeTab === "Forms" ? "forms" : "profiles"}...`}
            />
          </View>
          <TouchableOpacity style={styles.searchIconContainer}>
            <Image
              source={require('@/assets/images/search_icon.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Chips for Filters */}
        <View style={styles.chipsContainer}>
          {renderChips()}
        </View>

        {/* Content */}
        {activeTab === "Forms" ? renderForms() : renderProfiles()}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(240, 243, 245, 0.6)",
    borderRadius: 23.5,
    width: 187,
    height: 47,
    alignSelf: "center",
    marginBottom: 16,
    alignItems: "center",
  },
  toggleButton: {
    flex: 1,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23.5,
  },
  activeToggleButton: {
    backgroundColor: "#ffffff",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#08415C",
    opacity: 0.6,
  },
  activeToggleButtonText: {
    fontWeight: "bold",
    opacity: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: 346,
    height: 44,
    paddingLeft: 15,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 16,
    color: "#08415C",
  },
  searchIconContainer: {
    marginLeft: 52,
    backgroundColor: "rgba(240, 243, 245, 0.6)",
    padding: 10,
    borderRadius: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#08415C",
  },
  chipsContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E6E6E6",
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: "#2E8BB7",
  },
  chipText: {
    fontSize: 14,
    color: "#08415C",
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#08415C",
    paddingLeft: 10,
  },
  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  profileCard: {
    width: 110,
    height: 140,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08415C",
  },
  profileRole: {
    fontSize: 14,
    color: "gray",
  },
});

export default FormHistoryScreen;
