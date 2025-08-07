import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Target, TrendingUp, Calendar, Award, Plus } from "lucide-react-native";

const mockGoals = [
  {
    id: 1,
    title: "Increase Monthly Revenue",
    category: "Business",
    progress: 75,
    target: 50000,
    current: 37500,
    unit: "$",
    deadline: "2024-03-31",
    priority: "High",
  },
  {
    id: 2,
    title: "Complete React Native Course",
    category: "Education",
    progress: 40,
    target: 100,
    current: 40,
    unit: "%",
    deadline: "2024-02-28",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Acquire 25 New Clients",
    category: "Business",
    progress: 60,
    target: 25,
    current: 15,
    unit: "clients",
    deadline: "2024-04-15",
    priority: "High",
  },
];

export default function GoalsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Business", "Personal", "Health", "Education"];

  const filteredGoals =
    selectedCategory === "All"
      ? mockGoals
      : mockGoals.filter((goal) => goal.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      case "Low":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Business":
        return <Target size={16} color="#3B82F6" />;
      case "Education":
        return <Award size={16} color="#8B5CF6" />;
      case "Health":
        return <TrendingUp size={16} color="#10B981" />;
      default:
        return <Target size={16} color="#6B7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Goals</Text>
          <Text style={styles.subtitle}>
            Track your progress and achievements
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={styles.statNumber}>65%</Text>
            <Text style={styles.statLabel}>Avg Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Add Goal Button */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Goals</Text>
          <TouchableOpacity
            style={styles.addGoalButton}
            onPress={() => router.push("/goals/add-goal")}
          >
            <Plus size={20} color="#3B82F6" />
            <Text style={styles.addGoalText}>Add Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Goals List */}
        <View style={styles.goalsContainer}>
          {filteredGoals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <View style={styles.goalTitleContainer}>
                  {getCategoryIcon(goal.category)}
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(goal.priority) + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      { color: getPriorityColor(goal.priority) },
                    ]}
                  >
                    {goal.priority}
                  </Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${goal.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{goal.progress}%</Text>
              </View>

              <View style={styles.goalDetails}>
                <View style={styles.goalStat}>
                  <Text style={styles.goalStatLabel}>Current</Text>
                  <Text style={styles.goalStatValue}>
                    {goal.current.toLocaleString()}
                    {goal.unit}
                  </Text>
                </View>
                <View style={styles.goalStat}>
                  <Text style={styles.goalStatLabel}>Target</Text>
                  <Text style={styles.goalStatValue}>
                    {goal.target.toLocaleString()}
                    {goal.unit}
                  </Text>
                </View>
                <View style={styles.goalStat}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.goalStatValue}>{goal.deadline}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  categoryText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addGoalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF4FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addGoalText: {
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 4,
  },
  goalsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  goalCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
    minWidth: 40,
  },
  goalDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goalStat: {
    alignItems: "center",
  },
  goalStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  goalStatValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
});
