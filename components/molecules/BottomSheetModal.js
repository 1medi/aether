import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View,Text, StyleSheet } from "react-native";
import React, {useRef,useState} from "react";
import {colors,typography} from "@/css/globals"

export default function BottomModal({ paraphrasedText }) {

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["30%", "60%", "90%"];

  return (
    <>
      <BottomSheet 
      ref={sheetRef} 
      snapPoints={snapPoints} 
      enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.container}>
          <Text style={{...typography(true).h1}}>Results</Text>
          {Array.isArray(paraphrasedText) &&
            paraphrasedText.map((o, i) => (
              <View style={styles.promptOutput} key={`para_${i}`}>
                <Text style={{ fontWeight: "bold", color: "blue" }}>
                  {o.Title}
                </Text>
                <Text>{o.description}</Text>
              </View>
            ))}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
container: {
  padding: 30
}
})