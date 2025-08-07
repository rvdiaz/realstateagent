import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, Building, DollarSign, Calendar, Save } from 'lucide-react-native';

export default function AddClientScreen() {
  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    status: 'lead' as 'lead' | 'prospect' | 'client' | 'follow-up',
    value: '',
    notes: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    source: 'Website',
    assignedTo: 'John Doe',
  });

  const statusOptions = [
    { value: 'lead', label: 'Lead', color: '#F59E0B' },
    { value: 'prospect', label: 'Prospect', color: '#3B82F6' },
    { value: 'client', label: 'Client', color: '#10B981' },
    { value: 'follow-up', label: 'Follow-up', color: '#EF4444' },
  ];

  const sourceOptions = ['Website', 'Referral', 'Social Media', 'Cold Call', 'Email Campaign', 'Event', 'Other'];

  const handleSave = () => {
    if (!clientData.firstName.trim() || !clientData.lastName.trim()) {
      Alert.alert('Error', 'Please enter first and last name');
      return;
    }
    if (!clientData.email.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    
    Alert.alert('Success', 'Client added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Client</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>First Name *</Text>
              <View style={styles.inputContainer}>
                <User size={16} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  value={clientData.firstName}
                  onChangeText={(text) => setClientData({...clientData, firstName: text})}
                  placeholder="First Name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Last Name *</Text>
              <View style={styles.inputContainer}>
                <User size={16} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  value={clientData.lastName}
                  onChangeText={(text) => setClientData({...clientData, lastName: text})}
                  placeholder="Last Name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Mail size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={clientData.email}
                onChangeText={(text) => setClientData({...clientData, email: text})}
                placeholder="email@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={clientData.phone}
                onChangeText={(text) => setClientData({...clientData, phone: text})}
                placeholder="+1 (555) 123-4567"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Company Name</Text>
            <View style={styles.inputContainer}>
              <Building size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={clientData.company}
                onChangeText={(text) => setClientData({...clientData, company: text})}
                placeholder="Company Name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Job Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={clientData.jobTitle}
                onChangeText={(text) => setClientData({...clientData, jobTitle: text})}
                placeholder="Job Title"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status & Value</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusButtons}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[
                    styles.statusButton,
                    clientData.status === status.value && styles.selectedStatus,
                    { borderColor: status.color }
                  ]}
                  onPress={() => setClientData({...clientData, status: status.value as any})}
                >
                  <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                  <Text style={[
                    styles.statusButtonText,
                    clientData.status === status.value && { color: status.color }
                  ]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Potential Value</Text>
            <View style={styles.inputContainer}>
              <DollarSign size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={clientData.value}
                onChangeText={(text) => setClientData({...clientData, value: text})}
                placeholder="25000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Lead Source</Text>
            <View style={styles.sourceButtons}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sourceOptions.map((source) => (
                  <TouchableOpacity
                    key={source}
                    style={[
                      styles.sourceButton,
                      clientData.source === source && styles.selectedSource
                    ]}
                    onPress={() => setClientData({...clientData, source})}
                  >
                    <Text style={[
                      styles.sourceButtonText,
                      clientData.source === source && styles.selectedSourceText
                    ]}>
                      {source}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notes</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={clientData.notes}
                onChangeText={(text) => setClientData({...clientData, notes: text})}
                placeholder="Add any additional notes about this client..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave}>
            <User size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Add Client</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  textArea: {
    marginLeft: 0,
    textAlignVertical: 'top',
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: '45%',
    justifyContent: 'center',
  },
  selectedStatus: {
    backgroundColor: '#F8FAFC',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  sourceButtons: {
    height: 40,
  },
  sourceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSource: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  sourceButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedSourceText: {
    color: '#3B82F6',
  },
  actionSection: {
    paddingVertical: 24,
  },
  saveButtonLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});