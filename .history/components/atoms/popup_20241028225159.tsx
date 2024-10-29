// PopUp Component
import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const PopUp = ({ visible, setVisible }) => {
  const ArrowIcon = (props) => (
    <Icon name='arrow-forward-outline' {...props} style={{ width: 25, height: 20, tint: 'white' }} />
  );

  const navigation = useNavigation();

  // Function to handle both closing the modal and navigating
  const handleCloseAndNavigate = () => {
    setVisible(false);
    navigation.navigate('PensionPlan');
  };

  return (
    <View>
      <Pressable style={styles.formButton} onPress={() => setVisible(true)}>
        <View style={styles.textContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Autofill</Text>
            <ArrowIcon />
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filling in your saved information...</Text>
            <Pressable
              style={[styles.formButton, { marginTop: 15 }]}
              onPress={handleCloseAndNavigate} // Closes modal and navigates
            >
              <Text style={styles.close}>Close</Text>
              
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  formButton: {
    borderRadius: 12,
    backgroundColor: '#8EAACD',
    width: 80,
    height: 30,
    marginBottom: 13,
    justifyContent: 'center',
  },
  textContainer: { padding: 5 },
  viewContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 

  },

  title: {
    fontSize: 10,
    width: 50, 
    fontWeight: 'bold', 
    color: '#08415C'
          },
  modalText: {
    marginBottom: 15, textAlign: 'center'
  },
  close: {
    fontSize: 10, width: 80, fontWeight: 'bold', color: '#08415C', 
    alignItems: 'center' 
  },
});

export default PopUp;
