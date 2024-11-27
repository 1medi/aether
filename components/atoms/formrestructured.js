import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, CheckBox } from 'react-native';

export default function ExtendedHealthCareClaimForm() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Extended Health Care Claim Form</Text>
      <Text style={styles.subHeader}>
        • Use this form for all medical expenses and services. {"\n"}
        • For dental expenses, please use the Dental Claim Form. {"\n"}
        • Please print clearly and be sure all sections are complete to avoid delays in processing your claim.
      </Text>

      <Text style={styles.sectionHeader}>1 Information about you</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contract Number</Text>
        <TextInput style={styles.input} placeholder="Enter contract number" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Member ID Number</Text>
        <TextInput style={styles.input} placeholder="Enter member ID number" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Plan Sponsor/Employer</Text>
        <TextInput style={styles.input} placeholder="Enter plan sponsor/employer" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter last name" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} placeholder="Enter first name" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Male</Text>
        <CheckBox value={false} />
        <Text style={styles.label}>Female</Text>
        <CheckBox value={false} />
      </View>

      <Text style={styles.sectionHeader}>2 Are you covered under another plan?</Text>
      <View style={styles.row}>
        <Text style={styles.label}>No</Text>
        <CheckBox value={false} />
        <Text style={styles.label}>Yes</Text>
        <CheckBox value={false} />
      </View>

      <Text style={styles.sectionHeader}>3 Information about your claim</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name of Person Claiming</Text>
        <TextInput style={styles.input} placeholder="Enter name" />
      </View>

      <Text style={styles.sectionHeader}>4 Authorization and Signature</Text>
      <Text style={styles.para}>
        I certify that all goods and services being claimed have been received by me and/or my spouse or dependents...
      </Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Signature</Text>
        <TextInput style={styles.input} placeholder="Sign here" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  para: {
    fontSize: 14,
    marginBottom: 10,
  },
});
