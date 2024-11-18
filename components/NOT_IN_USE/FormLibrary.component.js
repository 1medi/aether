// import React, { useState } from "react";
// import {
//   Button,
//   Divider,
//   Layout,
//   Icon,
//   Input,
// } from "@ui-kitten/components";
// import {
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   View,
// } from "react-native";
// import Header from "@/components/header/Header";
// import FormListCard from "@/components/molecules/FormListCard";
// import { FilterButton } from "@/components/atoms/filterButton";
// import ConsoleScreen from "@/components/atoms/ConsoleScreen";
// import formsData from "@/app/data/mock_data";
// import {
//   useFonts,
//   DMSans_400Regular,
//   DMSans_500Medium,
//   DMSans_700Bold,
// } from "@expo-google-fonts/dm-sans";

// import AppLoading from "expo-app-loading";
// import { LinearGradient } from "expo-linear-gradient";

// export const FormLibraryScreen = ({ navigation }) => {
//   const [filteredForms, setFilteredForms] = useState(formsData || []);
//   let [fontsLoaded] = useFonts({
//     DMSans_400Regular,
//     DMSans_500Medium,
//     DMSans_700Bold,
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   const handleFilterChange = (index) => {
//     const selectedCategory =
//       index.row === 0 ? "All" : formsData[index.row - 1].category;
//     setFilteredForms(
//       selectedCategory === "All"
//         ? formsData
//         : formsData.filter((form) => form.category === selectedCategory)
//     );
//   };

//   const navigateToCategory = (category) => {
//     navigation.navigate("Library", { category });
//   };

//   return (
//     <>
//         <SafeAreaView style={styles.homePage}>
//           <Header title={"Form Library"} />
//           <Layout style={styles.numberContainer}>
//             <Text style={styles.largeNumber}>
//               <Text style={{ opacity: 0.5 }}>0</Text>69
//             </Text>

//             <View style={styles.numberTextContainer}>
//               <Text style={styles.subText}>
//                 Browse from our current library of
//               </Text>
//               <Text style={styles.formsText}>forms</Text>
//             </View>
//           </Layout>

//           <FilterButton onSelect={handleFilterChange} />

//           <ScrollView
//             style={{ marginHorizontal: 8, backgroundColor: "none", margin: 10 }}
//           >
//             <Layout style={{ backgroundColor: "none" }}>
//               {filteredForms.map((form) => (
//                 <FormListCard
//                   key={form.id}
//                   title={form.title}
//                   subheader={form.description}
//                   onPress={() => navigateToCategory(form.category)}
//                 />
//               ))}
//             </Layout>
//           </ScrollView>
//           <ConsoleScreen />
//         </SafeAreaView>
//     </>
//   );
// };

// export default FormLibraryScreen;

// const styles = StyleSheet.create({
//   homePage: {
//     flex: 1,
//     backgroundColor: "none",
//     height: "100%",
//   },
//   gradientContainer: {
//     flex: 1, // Make gradient cover the entire screen
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 24,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 5,
//   },
//   filterIcon: {
//     width: 24,
//     height: 24,
//     tintColor: "#08415C",
//     backgroundColor: "transparent",
//   },

//   headerText: {
//     fontSize: 32,
//     fontFamily: "Inter_400Regular",
//     color: "#08415C",
//   },
//   numberContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     margin: 20,
//     backgroundColor: "none",
//     paddingRight: 50,
//   },
//   largeNumber: {
//     fontSize: 100,
//     fontWeight: "bold",
//     color: "#6D96B7",
//     marginRight: 10,
//   },
//   numberTextContainer: {
//     flexDirection: "column",
//   },
//   subText: {
//     fontSize: 16,
//     color: "#6D96B7",
//     marginBottom: 5,
//     width: 100,
//   },
//   formsText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2A374A",
//   },
//   numberContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     margin: 10,
//     backgroundColor: "none",
//     paddingRight: 50,
//   },
//   largeNumber: {
//     fontSize: 100,
//     fontWeight: "bold",
//     color: "#6D96B7",
//     marginRight: 10,
//   },
//   numberTextContainer: {
//     flexDirection: "column",
//   },
//   subText: {
//     fontSize: 16,
//     color: "#6D96B7",
//     marginBottom: 5,
//     width: 100,
//   },
//   formsText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2A374A",
//   },
// });
