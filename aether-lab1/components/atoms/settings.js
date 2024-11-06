import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Button, Card, Text, Layout, Icon } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

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
    <>
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
          <LinearGradient
            colors={['#88B5DF', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.modalBackground}
          >
            <ScrollView
            showsVerticalScrollIndicator={false} 
            style={styles.modalContent}>
              <Text category="h5" style={styles.sectionTitle}>Setting</Text>

              <Text style={styles.sectionSubtitle}>Account Setting</Text>
              <Layout style={styles.settingCard}>
                <Button style={styles.buttonText} appearance="ghost">Account Information</Button>
                <Button appearance="ghost">Password Management</Button>
                <Button appearance="ghost">Notification</Button>
                <Button appearance="ghost">Appearance</Button>
              </Layout>

              <Text style={styles.sectionSubtitle}>Help & Support</Text>
              <Layout style={styles.settingCard}>
                <Button appearance="ghost">FAQ</Button>
                <Button appearance="ghost">Contact Support</Button>
                <Button appearance="ghost">App Tutorial</Button>
              </Layout>

              <Text style={styles.sectionSubtitle}>Other</Text>
              <Layout style={styles.settingCard}>
                <Button appearance="ghost">Terms of Service</Button>
                <Button appearance="ghost">Privacy Policy</Button>
              </Layout>

              <Button style={{marginBottom:40}} onPress={() => setVisible(false)}>Close</Button>
            </ScrollView>
          </LinearGradient>
        </Modal>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'none',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  buttonText:{
    textAlign:'left'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 30,

    backgroundColor: 'none',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  settingCard: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 0,
    backgroundColor: '#f0f0f0', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  sectionSubtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#08415C',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#08415C',
    padding: 8,
    borderRadius: 12,
  },
});
