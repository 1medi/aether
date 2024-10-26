import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Icon, Text, Layout } from '@ui-kitten/components';

export default function ModalSimpleUsageShowcase() {
  const [visible, setVisible] = useState(false);

  const SettingsIcon = (props) => (
    <Icon
      name="settings-outline" 
      {...props}
      style={styles.settingsIcon}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <SettingsIcon />
        </TouchableOpacity>
      </View>

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
    backgroundColor: 'none'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  settingsIcon: {
    width: 12, 
    height: 12, 
    tintColor: '#08415C', 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 20, 
    overflow: 'hidden', 
    background: 'transparent',
  }
}
);
