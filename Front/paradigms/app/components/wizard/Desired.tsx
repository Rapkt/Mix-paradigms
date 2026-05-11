import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { COURSES } from "../../../constants/courses";

interface Step3Props {
  major: string;
  takenCourses: string[];
  desiredCourses: string[]; // Note: This will now hold PREFERENCES (e.g., ["Math", "AI"])
  setDesiredCourses: (preferences: string[]) => void;
  currentYear: number;
}

export default function DesiredCourses({
  major,
  takenCourses,
  desiredCourses,
  setDesiredCourses,
  currentYear,
}: Step3Props) {
  const [activeTab, setActiveTab] = useState<number>(currentYear);

  // 1. Get courses for the major AND filter out ones they already took
  const availableMajorCourses = COURSES.filter(
    (c) => c.major === major && !takenCourses.includes(c.name),
  );

  // 2. Find out which years are left
  const availableYears = Array.from(
    new Set(availableMajorCourses.map((c) => c.year)),
  ).sort((a, b) => a - b);

  // 3. Filter list by the active tab
  const displayedCourses = availableMajorCourses.filter(
    (c) => c.year === activeTab,
  );

  // 4. NEW: Extract UNIQUE PREFERENCES from the displayed courses!
  // We use Set() to remove duplicates, and filter(Boolean) to remove empty strings.
  const uniquePreferences = Array.from(
    new Set(displayedCourses.map((c) => c.preference)),
  ).filter(Boolean);

  const togglePreference = (pref: string) => {
    if (desiredCourses.includes(pref)) {
      setDesiredCourses(desiredCourses.filter((p) => p !== pref));
    } else {
      setDesiredCourses([...desiredCourses, pref]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>What topics interest you next?</Text>
        <Text style={styles.subtitle}>
          Selected interests: {desiredCourses.length}
        </Text>
      </View>

      {/* THE YEAR TABS */}
      <View style={styles.tabContainer}>
        {availableYears.map((year) => (
          <Pressable
            key={year}
            style={[styles.tab, activeTab === year && styles.activeTab]}
            onPress={() => setActiveTab(year)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === year && styles.activeTabText,
              ]}
            >
              Year {year}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {uniquePreferences.length === 0 ? (
          <Text style={styles.emptyText}>
            No specific topics available for Year {activeTab}.
          </Text>
        ) : (
          uniquePreferences.map((pref) => {
            // Check if this preference is currently selected
            const isDesired = desiredCourses.includes(pref);

            return (
              <Pressable
                key={pref}
                style={[
                  styles.courseCard,
                  isDesired && styles.courseCardDesired,
                ]}
                onPress={() => togglePreference(pref)}
              >
                <Text
                  style={[
                    styles.courseName,
                    isDesired && styles.courseTextSelected,
                  ]}
                >
                  {pref}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontStyle: "italic",
  },

  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: { backgroundColor: "#333" },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#666" },
  activeTabText: { color: "#fff" },

  courseCard: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "center", // Center the text since it's just one word now!
    alignItems: "center",
  },
  courseCardDesired: { backgroundColor: "#FF9500", borderColor: "#FF9500" },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  courseTextSelected: { color: "#fff" },
});
