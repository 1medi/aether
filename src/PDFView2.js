import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, Dimensions, ScrollView } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const InputSizeShowcase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const smallInputState = useInputState();

  // Zoom-related shared value
  const scale = useSharedValue(1);

  const handleNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pinch Gesture Event Handler
  const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], { useNativeDriver: true });

  // Reset scale if pinch ends
  const onPinchStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      scale.value = withTiming(1, { duration: 200 }); // Reset scale to original size
    }
  };

  // Animated style for zoom effect
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} horizontal>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Layout>
              {currentPage === 1 && (
                <ImageBackground
                  source={require('@/assets/files/insurance1.png')}
                  style={styles.imageBackground}
                  resizeMode="contain"
                >
                  <Input
                    style={[styles.input, { top: 150, left: 30, width: 200 }]}
                    textStyle={{ fontSize: 10 }}
                    placeholder="Contract Number"
                    {...smallInputState}
                  />
                  <Input
                    style={[styles.input, { top: 220, left: 30, width: 200 }]}
                    textStyle={{ fontSize: 10 }}
                    placeholder="Last Name"
                  />
                </ImageBackground>
              )}
              {currentPage === 2 && (
                <ImageBackground
                  source={require('@/assets/files/Insurance2.png')}
                  style={styles.imageBackground}
                  resizeMode="contain"
                >
                  <Input
                    style={[styles.input, { top: 150, left: 30, width: 200 }]}
                    textStyle={{ fontSize: 10 }}
                    placeholder="Member's Signature"
                  />
                  <Input
                    style={[styles.input, { top: 400, left: 30, width: 150, height: 35 }]}
                    textStyle={{ fontSize: 8 }}
                    placeholder="Date"
                  />
                </ImageBackground>
              )}
            </Layout>
          </Animated.View>
        </PinchGestureHandler>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={handleNextPage}
          disabled={currentPage === 2}
          style={styles.button}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: screenWidth,
    height: screenHeight,
  },
  input: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default InputSizeShowcase;
