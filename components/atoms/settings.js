import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Icon, Text, Layout } from '@ui-kitten/components';

export default function ModalSimpleUsageShowcase() {
  const [visible, setVisible] = useState(false);

  const CameraIcon = (props) => (
    <Icon
      name="settings-outline"  // Changed to gear icon
      {...props}
      style={{ width: 32, height: 32 }}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      {/* Icon in top-right corner using flexbox */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <CameraIcon />
        </TouchableOpacity>
      </View>

      {/* Modal with Animation */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        backdropStyle={styles.backdrop}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Card disabled={true}>
            <Text>Welcome to Aether</Text>
            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'flex-start', 
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',  
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  },
});
