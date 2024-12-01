import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import Signature from "react-native-signature-canvas";

const SignatureModal = ({ visible, onClose, onSave }) => {
  const [signature, setSignature] = useState(null);

  const handleSignature = (signatureData) => {
    console.log("Signature captured:", signatureData); // Debugging: Log the signature
    setSignature(signatureData);
  };

  const handleSave = () => {
    if (signature) {
      onSave(signature); // Pass signature to the parent
    } else {
      console.warn("No signature to save!"); // Debugging
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.signatureContainer}>
          <Signature
            onOK={(signatureData) => {
              if (!signatureData) {
                console.warn("No signature drawn!"); // Warn if no signature
                return;
              }
              handleSignature(signatureData); // Save signature
            }}
            descriptionText="Please draw your signature before pressing Save."
            clearText="Clear"
            confirmText="Save"
            webStyle={styles.signaturePad}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={onClose}>Close</Button>
          <Button onPress={handleSave}>Save</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  signatureContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    height: 200,
  },
  signaturePad: `
    .m-signature-pad {
      box-shadow: none; border: none; 
    }
    .m-signature-pad--body { border: none; }
  `,
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default SignatureModal;
