import { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function ScanAnimation () {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'none',
        }}
        source={require("@/assets/animations/scanAnimation.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
