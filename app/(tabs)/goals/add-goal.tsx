import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Target, Calendar, DollarSign, Users, BookOpen, Save } from 'lucide-react-native';

export default function AddGoalScreen() {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    category: 'Business',
    targetValue: '',
    unit: '$',
    deadline: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });

  const categories = [
    { id: 'Business', label: 'Business', icon: DollarSign, color: '#3B82F6' },
    { id: 'Personal', label: 'Personal', icon: Target, color: '#10B981' },
    { id: 'Health', label: 'Health', icon: Target, color: '#EF4444' },
    { id: 'Education', label: 'Education', icon: BookOpen, color: '#F59E0B' },
    { id: 'Social', label: 'Social', icon: Users, color: '#8B5CF6' },
  ];

  const units = ['$', 'clients', 'courses', 'hours', 'projects', 'kg', 'miles', 'books'];

  const handleSave = () => {
    if (!goalData.title.trim()) {
      Alert.alert('Error', 'Please enter a goal title');
      return;
    }
    if (!goalData.targetValue.trim()) {
      Alert.alert('Error', 'Please enter a target value');
      return;
    }
    
    Alert.alert('Success', 'Goal created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>New Goal</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Goal Title *</Text>
            <View style={styles.inputContainer}>
              <Target size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={goalData.title}
                onChangeText={(text) => setGoalData({...goalData, title: text})}
                placeholder="Enter your goal title"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={goalData.description}
                onChangeText={(text) => setGoalData({...goalData, description: text})}
                placeholder="Describe your goal in detail..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = goalData.category === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    isSelected && { borderColor: category.color, backgroundColor: `${category.color}10` }
                  ]}
                  onPress={() => setGoalData({...goalData, category: category.id})}
                >
                  <IconComponent 
                    size={24} 
                    color={isSelected ? category.color : '#6B7280'} 
                  />
                  <Text style={[
                    styles.categoryText,
                    isSelected && { color: category.color }
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target & Timeline</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, styles.flexTwo]}>
              <Text style={styles.inputLabel}>Target Value *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={goalData.targetValue}
                  onChangeText={(text) => setGoalData({...goalData, targetValue: text})}
                  placeholder="Enter target value"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={[styles.inputGroup, styles.flexOne]}>
              <Text style={styles.inputLabel}>Unit</Text>
              <View style={styles.unitSelector}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {units.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        styles.unitButton,
                        goalData.unit === unit && styles.selectedUnit
                      ]}
                      onPress={() => setGoalData({...goalData, unit})}
                    >
                      <Text style={[
                        styles.unitText,
                        goalData.unit === unit && styles.selectedUnitText
                      ]}>
                        {unit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Deadline</Text>
            <View style={styles.inputContainer}>
              <Calendar size={16} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                value={goalData.deadline}
                onChangeText={(text) => setGoalData({...goalData, deadline: text})}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Level</Text>
          <View style={styles.priorityButtons}>
            {['high', 'medium', 'low'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  goalData.priority === priority && styles.selectedPriority,
                  { borderColor: getPriorityColor(priority) }
                ]}
                onPress={() => setGoalData({...goalData, priority: priority as any})}
              >
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(priority) }
                ]} />
                <Text style={[
                  styles.priorityButtonText,
                  goalData.priority === priority && { color: getPriorityColor(priority) }
                ]}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave}>
            <Target size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Create Goal</Text>
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
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 8,
  },
  unitSelector: {
    height: 48,
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  selectedUnit: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedUnitText: {
    color: '#3B82F6',
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedPriority: {
    backgroundColor: '#F8FAFC',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
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