import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Mail, MessageSquare, Calendar, Target, Users } from 'lucide-react-native';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    taskReminders: true,
    goalUpdates: true,
    crmAlerts: false,
    weeklyReports: true,
    marketingEmails: false,
    securityAlerts: true,
    appUpdates: true,
  });

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const notificationSections = [
    {
      title: 'General Notifications',
      items: [
        {
          key: 'pushNotifications',
          title: 'Push Notifications',
          description: 'Receive push notifications on your device',
          icon: Bell,
        },
        {
          key: 'emailNotifications',
          title: 'Email Notifications',
          description: 'Receive notifications via email',
          icon: Mail,
        },
        {
          key: 'smsNotifications',
          title: 'SMS Notifications',
          description: 'Receive notifications via text message',
          icon: MessageSquare,
        },
      ],
    },
    {
      title: 'App Features',
      items: [
        {
          key: 'taskReminders',
          title: 'Task Reminders',
          description: 'Get reminded about upcoming and overdue tasks',
          icon: Calendar,
        },
        {
          key: 'goalUpdates',
          title: 'Goal Progress Updates',
          description: 'Notifications about goal milestones and achievements',
          icon: Target,
        },
        {
          key: 'crmAlerts',
          title: 'CRM Alerts',
          description: 'Client follow-ups and important CRM activities',
          icon: Users,
        },
      ],
    },
    {
      title: 'Reports & Updates',
      items: [
        {
          key: 'weeklyReports',
          title: 'Weekly Reports',
          description: 'Weekly summary of your productivity and progress',
          icon: Mail,
        },
        {
          key: 'marketingEmails',
          title: 'Marketing Emails',
          description: 'Product updates, tips, and promotional content',
          icon: Mail,
        },
        {
          key: 'securityAlerts',
          title: 'Security Alerts',
          description: 'Important security and account notifications',
          icon: Bell,
        },
        {
          key: 'appUpdates',
          title: 'App Updates',
          description: 'Notifications about new features and updates',
          icon: Bell,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notificationSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <View key={item.key} style={styles.notificationItem}>
                  <View style={styles.notificationLeft}>
                    <View style={styles.iconContainer}>
                      <IconComponent size={20} color="#3B82F6" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationDescription}>{item.description}</Text>
                    </View>
                  </View>
                  <Switch
                    value={notifications[item.key as keyof typeof notifications]}
                    onValueChange={(value) => updateNotification(item.key, value)}
                    trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              );
            })}
          </View>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Notification Settings</Text>
          <Text style={styles.infoText}>
            You can customize when and how you receive notifications. Some security-related 
            notifications cannot be disabled to ensure your account safety.
          </Text>
          <Text style={styles.infoText}>
            Push notifications require permission from your device settings. If you're not 
            receiving notifications, please check your device's notification settings.
          </Text>
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
  placeholder: {
    width: 40,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
});