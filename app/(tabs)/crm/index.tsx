import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  ChartBar as BarChart3,
  FileText,
} from "lucide-react-native";

export default function CRMDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc.",
      email: "john@techsolutions.com",
      phone: "+1 (555) 123-4567",
      lastContact: "2024-01-15",
      status: "Active",
      value: "$25,000",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Marketing Pro",
      email: "sarah@marketingpro.com",
      phone: "+1 (555) 987-6543",
      lastContact: "2024-01-12",
      status: "Prospect",
      value: "$15,000",
    },
    {
      id: 3,
      name: "Mike Davis",
      company: "Design Studio",
      email: "mike@designstudio.com",
      phone: "+1 (555) 456-7890",
      lastContact: "2024-01-10",
      status: "Active",
      value: "$35,000",
    },
  ];

  const stats = [
    { label: "Total Clients", value: "156", icon: Users, color: "#3B82F6" },
    { label: "Active Deals", value: "23", icon: TrendingUp, color: "#10B981" },
    { label: "This Month", value: "$125K", icon: Calendar, color: "#F59E0B" },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>CRM Dashboard</Text>
          <Text style={styles.subtitle}>Manage your client relationships</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/crm/pipeline")}
          >
            <BarChart3 size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/crm/reports")}
          >
            <FileText size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/crm/add-client")}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: `${stat.color}15` },
                  ]}
                >
                  <IconComponent size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Clients List */}
        <View style={styles.clientsSection}>
          <Text style={styles.sectionTitle}>Recent Clients</Text>
          {filteredClients.map((client) => (
            <TouchableOpacity key={client.id} style={styles.clientCard}>
              <View style={styles.clientInfo}>
                <View style={styles.clientHeader}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          client.status === "Active"
                            ? "#10B98115"
                            : "#F59E0B15",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            client.status === "Active" ? "#10B981" : "#F59E0B",
                        },
                      ]}
                    >
                      {client.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.clientCompany}>{client.company}</Text>
                <View style={styles.clientDetails}>
                  <View style={styles.contactInfo}>
                    <Mail size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{client.email}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Phone size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{client.phone}</Text>
                  </View>
                </View>
                <View style={styles.clientFooter}>
                  <Text style={styles.lastContact}>
                    Last contact: {client.lastContact}
                  </Text>
                  <Text style={styles.clientValue}>{client.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  clientsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  clientCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clientInfo: {
    flex: 1,
  },
  clientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  clientCompany: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  clientDetails: {
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },
  clientFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastContact: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  clientValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
});
