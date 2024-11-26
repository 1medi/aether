import { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation () {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'none',
        }}
        source={require("@/assets/animations/uploadAnimation.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 300,
    height: 300,
    margin: "auto",
    padding: 100
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
