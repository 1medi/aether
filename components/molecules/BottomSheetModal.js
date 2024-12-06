import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  TouchableOpacity
} from "react-native";
import { Layout, Icon } from "@ui-kitten/components";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { colors } from "@/css/globals";
import { color } from "@rneui/base";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function BottomModal({ paraphrasedText }) {
  const sheetRef = useRef(null);
  const snapPoints = ["30%", "60%", "90%"];
  const [showFormsSuggestionBanner, setShowFormsSuggestionBanner] =
  useState(true);

  const [data, setData] = useState(
    Array.isArray(paraphrasedText) ? paraphrasedText : []
  );
  
  const ArrowIcon = (props) => <Icon style={{width:32, height:32, margin: "auto"}} name="arrow-back-outline" {...props} />;
  const TipsIcon = (props) => <Icon style={{width:24, height:24, margin: "auto", marginRight: 5}} name="bulb-outline" {...props} />;

  console.log("Initial data:", data);

  const handleDelete = async (id) => {
    console.log("Deleting paraphrase with ID:", id); // Log to debug the ID
  
    try {
      const response = await fetch(`https://aether-wnq5.onrender.com/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }
  
      setData((prevData) => prevData.filter((item) => item._id !== id));
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  

  const ListItem = React.memo(({ item }) => {
    const translateX = useSharedValue(0);
    let isDeleting = false;
  
    // Define Pan Gesture
    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        if (isDeleting) return;
  
        // Update translation value, bounded to SCREEN_WIDTH
        translateX.value = Math.max(Math.min(event.translationX, 0), -SCREEN_WIDTH);
      })
      .onEnd(() => {
        if (isDeleting) return;
  
        // Check if swipe is past threshold
        if (translateX.value < -SCREEN_WIDTH * 0.3) {
          isDeleting = true;
          translateX.value = withSpring(
            -SCREEN_WIDTH,
            { stiffness: 100, damping: 10 },
            () => {
              runOnJS(handleDelete)(item._id);
              isDeleting = false;
            }
          );
        } else {
          // Reset position if not swiped far enough
          translateX.value = withSpring(0);
        }
      });
  
    // Animated Styles
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));
  
    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.promptOutput, animatedStyle]}>
          <Text style={{ fontWeight: "bold", color: colors.light.blue, fontSize: 28 }}>{item.Title}</Text>
          <Text>{item.description}</Text>
        </Animated.View>
      </GestureDetector>
    );
  });  
  

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={[styles.container, { flex: 1 }]}>
        <Text style={styles.debug}>Results</Text>

          <View style={styles.suggestionBanner}>
            <TipsIcon/>
            <Text style={{fontSize: 24, color: colors.apple.black, padding: 6}}>Tip: Swipe Right To Delete!</Text>
          </View>
        {data.length === 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.placeholder}>No items to display</Text>
            <Button
              title="Add Sample Items"
              onPress={() => setData([...sampleItems])}
            />
          </View>
        ) : (
          <BottomSheetFlatList
          data={data.filter((item) => item._id)} // Only include items with valid _id
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  promptOutput: {
    backgroundColor: colors.light.lightStroke,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  debug: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.apple.green,
  },
  placeholder: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  suggestionBanner: {
    display:"flex",
    flexDirection: "row",
    justifyContent: 'center'
  }
});