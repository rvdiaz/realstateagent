import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Bot, User, CircleHelp as HelpCircle, FileText, Phone, Mail } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function SupportScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: '10:00 AM',
    },
  ]);
  
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(inputText),
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('task') || input.includes('todo')) {
      return 'I can help you with task management! You can create, edit, and organize your tasks in the Tasks tab. Would you like me to guide you through the process?';
    } else if (input.includes('goal') || input.includes('target')) {
      return 'Goals are a great way to track your progress! You can set up personal and business goals in the Goals tab. Each goal can have a target value, deadline, and progress tracking.';
    } else if (input.includes('crm') || input.includes('client')) {
      return 'The CRM section helps you manage client relationships. You can track leads, prospects, and existing clients, including their contact information and interaction history.';
    } else if (input.includes('calculator') || input.includes('mortgage')) {
      return 'Our calculator tools can help with financial calculations! Currently, you can use the mortgage calculator to estimate monthly payments and total interest. More calculators are coming soon.';
    } else if (input.includes('profile') || input.includes('settings')) {
      return 'You can manage your profile and app settings in the Profile tab. This includes notification preferences, account information, and privacy settings.';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I\'m here to help! You can ask me about any feature of the app, or contact human support using the options below the chat.';
    } else {
      return 'Thank you for your message! I\'m here to help you navigate the app and answer any questions about tasks, goals, CRM, calculations, or settings. What specific feature would you like to know more about?';
    }
  };

  const quickActions = [
    { id: 'tasks', label: 'Help with Tasks', icon: HelpCircle },
    { id: 'goals', label: 'Setting Goals', icon: HelpCircle },
    { id: 'crm', label: 'CRM Features', icon: HelpCircle },
    { id: 'calculator', label: 'Using Calculator', icon: HelpCircle },
  ];

  const supportOptions = [
    {
      id: 'docs',
      title: 'Documentation',
      description: 'Browse our comprehensive guides',
      icon: FileText,
      color: '#3B82F6',
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call us at (555) 123-4567',
      icon: Phone,
      color: '#10B981',
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@yourapp.com',
      icon: Mail,
      color: '#F59E0B',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Support Center</Text>
          <Text style={styles.subtitle}>Get help from our AI assistant</Text>
        </View>
        <MessageCircle size={28} color="#3B82F6" />
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <View style={styles.messageHeader}>
                <View style={styles.senderInfo}>
                  {message.sender === 'ai' ? (
                    <Bot size={16} color="#3B82F6" />
                  ) : (
                    <User size={16} color="#FFFFFF" />
                  )}
                  <Text style={[
                    styles.senderName,
                    message.sender === 'user' && styles.userSenderName
                  ]}>
                    {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                  </Text>
                </View>
                <Text style={[
                  styles.timestamp,
                  message.sender === 'user' && styles.userTimestamp
                ]}>
                  {message.timestamp}
                </Text>
              </View>
              <Text style={[
                styles.messageText,
                message.sender === 'user' && styles.userMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          ))}

          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Help</Text>
            <View style={styles.quickActions}>
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <TouchableOpacity
                    key={action.id}
                    style={styles.quickActionButton}
                    onPress={() => setInputText(action.label)}
                  >
                    <IconComponent size={16} color="#3B82F6" />
                    <Text style={styles.quickActionText}>{action.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.supportOptionsContainer}>
        <Text style={styles.supportOptionsTitle}>Other Support Options</Text>
        <View style={styles.supportOptions}>
          {supportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity key={option.id} style={styles.supportOption}>
                <View style={[styles.supportOptionIcon, { backgroundColor: `${option.color}20` }]}>
                  <IconComponent size={20} color={option.color} />
                </View>
                <View style={styles.supportOptionContent}>
                  <Text style={styles.supportOptionTitle}>{option.title}</Text>
                  <Text style={styles.supportOptionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  messageContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },
  userSenderName: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: '#6B7280',
  },
  userTimestamp: {
    color: '#DBEAFE',
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 6,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  supportOptionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  supportOptionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  supportOptions: {
    gap: 8,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  supportOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportOptionContent: {
    flex: 1,
  },
  supportOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  supportOptionDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});