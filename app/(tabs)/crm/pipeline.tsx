import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, DollarSign, Users, Calendar, Target } from 'lucide-react-native';

interface PipelineStage {
  id: string;
  name: string;
  clients: PipelineClient[];
  color: string;
}

interface PipelineClient {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  lastContact: string;
}

export default function PipelineScreen() {
  const [pipelineData] = useState<PipelineStage[]>([
    {
      id: 'lead',
      name: 'Leads',
      color: '#F59E0B',
      clients: [
        {
          id: '1',
          name: 'Emily Rodriguez',
          company: 'StartupXYZ',
          value: 8000,
          probability: 20,
          lastContact: '3 days ago',
        },
        {
          id: '2',
          name: 'Mark Thompson',
          company: 'Innovation Labs',
          value: 12000,
          probability: 15,
          lastContact: '1 week ago',
        },
      ],
    },
    {
      id: 'prospect',
      name: 'Prospects',
      color: '#3B82F6',
      clients: [
        {
          id: '3',
          name: 'Michael Chen',
          company: 'Global Industries',
          value: 25000,
          probability: 60,
          lastContact: '1 week ago',
        },
        {
          id: '4',
          name: 'Lisa Wang',
          company: 'Future Tech',
          value: 18000,
          probability: 45,
          lastContact: '4 days ago',
        },
      ],
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: '#8B5CF6',
      clients: [
        {
          id: '5',
          name: 'David Wilson',
          company: 'Enterprise Corp',
          value: 40000,
          probability: 80,
          lastContact: '2 days ago',
        },
      ],
    },
    {
      id: 'closed',
      name: 'Closed Won',
      color: '#10B981',
      clients: [
        {
          id: '6',
          name: 'Sarah Johnson',
          company: 'Tech Solutions Inc.',
          value: 15000,
          probability: 100,
          lastContact: '1 day ago',
        },
      ],
    },
  ]);

  const totalValue = pipelineData.reduce((total, stage) => 
    total + stage.clients.reduce((stageTotal, client) => stageTotal + client.value, 0), 0
  );

  const weightedValue = pipelineData.reduce((total, stage) => 
    total + stage.clients.reduce((stageTotal, client) => 
      stageTotal + (client.value * client.probability / 100), 0
    ), 0
  );

  const totalClients = pipelineData.reduce((total, stage) => total + stage.clients.length, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Sales Pipeline</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <DollarSign size={20} color="#10B981" />
          <Text style={styles.statValue}>${totalValue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Pipeline</Text>
        </View>
        <View style={styles.statCard}>
          <Target size={20} color="#3B82F6" />
          <Text style={styles.statValue}>${Math.round(weightedValue).toLocaleString()}</Text>
          <Text style={styles.statLabel}>Weighted Value</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={20} color="#F59E0B" />
          <Text style={styles.statValue}>{totalClients}</Text>
          <Text style={styles.statLabel}>Total Prospects</Text>
        </View>
      </View>

      <ScrollView horizontal style={styles.pipelineContainer} showsHorizontalScrollIndicator={false}>
        {pipelineData.map((stage) => (
          <View key={stage.id} style={styles.stageColumn}>
            <View style={[styles.stageHeader, { backgroundColor: stage.color }]}>
              <Text style={styles.stageName}>{stage.name}</Text>
              <Text style={styles.stageCount}>
                {stage.clients.length} • ${stage.clients.reduce((sum, client) => sum + client.value, 0).toLocaleString()}
              </Text>
            </View>
            
            <ScrollView style={styles.stageClients} showsVerticalScrollIndicator={false}>
              {stage.clients.map((client) => (
                <TouchableOpacity key={client.id} style={styles.clientCard}>
                  <View style={styles.clientHeader}>
                    <Text style={styles.clientName}>{client.name}</Text>
                    <Text style={styles.clientValue}>${client.value.toLocaleString()}</Text>
                  </View>
                  <Text style={styles.clientCompany}>{client.company}</Text>
                  
                  <View style={styles.clientMeta}>
                    <View style={styles.probabilityContainer}>
                      <View style={styles.probabilityBar}>
                        <View 
                          style={[
                            styles.probabilityFill,
                            { 
                              width: `${client.probability}%`,
                              backgroundColor: stage.color
                            }
                          ]} 
                        />
                      </View>
                      <Text style={styles.probabilityText}>{client.probability}%</Text>
                    </View>
                    
                    <View style={styles.lastContact}>
                      <Calendar size={12} color="#6B7280" />
                      <Text style={styles.lastContactText}>{client.lastContact}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={styles.addClientCard}>
                <Text style={styles.addClientText}>+ Add Client</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <View style={styles.insightsSection}>
        <Text style={styles.insightsTitle}>Pipeline Insights</Text>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <TrendingUp size={16} color="#10B981" />
            <Text style={styles.insightText}>
              Conversion rate from prospect to client: 67%
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Calendar size={16} color="#F59E0B" />
            <Text style={styles.insightText}>
              Average deal cycle: 45 days
            </Text>
          </View>
          <View style={styles.insightItem}>
            <DollarSign size={16} color="#3B82F6" />
            <Text style={styles.insightText}>
              Average deal size: ${Math.round(totalValue / totalClients).toLocaleString()}
            </Text>
          </View>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  pipelineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stageColumn: {
    width: 280,
    marginRight: 16,
  },
  stageHeader: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  stageCount: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  stageClients: {
    flex: 1,
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  clientValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  clientCompany: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  clientMeta: {
    gap: 8,
  },
  probabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  probabilityBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 2,
  },
  probabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    minWidth: 30,
  },
  lastContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastContactText: {
    fontSize: 11,
    color: '#6B7280',
  },
  addClientCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  addClientText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  insightsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
});