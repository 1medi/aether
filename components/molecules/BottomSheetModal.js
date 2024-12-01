import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function BottomModal({ paraphrasedText }) {
  const sheetRef = useRef(null);
  const snapPoints = ["30%", "60%", "90%"];

  const [data, setData] = useState(
    Array.isArray(paraphrasedText)
      ? paraphrasedText.map((item, index) => ({
          ...item,
          id: item.id ?? index,
        }))
      : [
          {
            id: 1,
            Title: "Sample Title 1",
            description: "Sample description 1",
          },
          {
            id: 2,
            Title: "Sample Title 2",
            description: "Sample description 2",
          },
        ]
  );

  console.log("Initial data:", data);

  const handleDelete = (id) => {
    console.log("Preparing to delete item with ID:", id);
    setData((prevData) => {
      const newData = prevData.filter((item) => item.id !== id);
      console.log("Updated data after deletion:", newData);
      return newData;
    });
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
              runOnJS(handleDelete)(item.id); // Delete item using runOnJS
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
          <Text style={{ fontWeight: "bold", color: "blue" }}>{item.Title}</Text>
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
        <Text style={styles.debug}>Modal is rendering</Text>
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
            data={data}
            keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  debug: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
  },
  placeholder: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});
