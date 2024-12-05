import React from "react";
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { Icon, Button } from "@ui-kitten/components";
import { colors,typography } from "@/css/globals";
import { color } from "@rneui/base";


const PensionPlanModal = ({ visible, onClose }) => {

  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("LibraryScreen");
    onClose(true)
  }

  const CancelIcon = (props) => (
    <Icon
      {...props}
      name='close-outline'
    />
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Extended Health Care Form</Text>
          <Text style={styles.subtitle}>Sunlife Financial</Text>
          <Image
            source={require('@/assets/files/insurance1.png')}
            style={styles.modalImage}
          />
          <View style={styles.modalDescription}>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text>
              This form helps you apply for pension benefits based on
              your injury history.
            </Text>
            <Text style={styles.descriptionTitle}>Purpose:</Text>
            <Text>
              To ensure you receive your entitled benefits by providing the
              necessary application details.
            </Text>
          </View>
        </View>
        <View style={styles.modalActions}>
            <TouchableOpacity accessoryLeft={CancelIcon} onPress={onClose} style={styles.cancelButton}>
              <Icon name="close-outline" style={{width:24, height: 24, margin: "auto", tintColor:colors.apple.white}}/>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButton} onPress={handleNavigation}>
              <Text style={styles.startButtonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.apple.glass40,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: colors.apple.offWhite,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
  ...typography(true).h1,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalImage: {
    width: "100%",
    height: 300,
  },
  modalDescription: {
    marginVertical: 10,
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    width: 300,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: colors.apple.red,
    borderBottomLeftRadius: 10,
    width:"50%",
    flex: 1,
    flexDirection:"row",
  },
  startButton: {
    padding: 10,
    backgroundColor: colors.apple.green,
    borderBottomRightRadius: 10,
        width:"50%"
  },
  startButtonText: {
    color: 'white',
    textAlign: "center",
    margin:"auto"
  },
  cancelButtonText: {
    textAlign: "center",
    margin:"auto",
    color: colors.apple.white
  }
});

export default PensionPlanModal;
