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
          width: 100,
          height: 100,
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
    width: 50,
    height: 50,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
