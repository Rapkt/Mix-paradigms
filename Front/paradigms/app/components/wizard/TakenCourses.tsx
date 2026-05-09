import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { DUMMY_COURSES } from "../../../constants/courses";
interface Step2 {
  major: string;
  takenCourses: string[];
  setTakenCourses: (courses: string[]) => void;
  currentYear: number;
}

export default function TakenCourses({
  major,
  takenCourses,
  setTakenCourses,
  currentYear,
}: Step2) {
  const [activeTab, setActiveTab] = useState<number>(currentYear);

  // 1. Get ONLY the courses for the selected major
  const majorCourses = DUMMY_COURSES.filter((c) => c.major === major);

  // 2. Dynamically figure out what years actually exist for this major (e.g., [1, 2, 3, 4, 5])
  const availableYears = Array.from(
    new Set(majorCourses.map((c) => c.year)),
  ).sort((a, b) => a - b);

  // 3. Get ONLY the courses that match the currently clicked tab
  const displayedCourses = majorCourses.filter((c) => c.year === activeTab);

  const toggleCourse = (courseId: string) => {
    if (takenCourses.includes(courseId)) {
      setTakenCourses(takenCourses.filter((id) => id !== courseId));
    } else {
      setTakenCourses([...takenCourses, courseId]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>What have you already taken?</Text>
        <Text style={styles.subtitle}>
          Total selected: {takenCourses.length}
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

      {/* THE FILTERED COURSE LIST */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {displayedCourses.map((course) => {
          const isTaken = takenCourses.includes(course.id);
          return (
            <Pressable
              key={course.id}
              style={[styles.courseCard, isTaken && styles.courseCardSelected]}
              onPress={() => toggleCourse(course.id)}
            >
              <Text
                style={[
                  styles.courseName,
                  isTaken && styles.courseTextSelected,
                ]}
              >
                {course.id}: {course.name}
              </Text>
              <Text
                style={[
                  styles.courseDifficulty,
                  isTaken && styles.courseTextSelected,
                ]}
              >
                {course.difficulty}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 15 },

  // Tab Styles
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
  activeTab: { backgroundColor: "#333" }, // Dark gray to distinguish tabs from courses
  tabText: { fontSize: 14, fontWeight: "bold", color: "#666" },
  activeTabText: { color: "#fff" },

  // Course Card Styles
  courseCard: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseCardSelected: { backgroundColor: "#34C759", borderColor: "#34C759" },
  courseName: { fontSize: 16, fontWeight: "500", color: "#333", flex: 1 },
  courseDifficulty: { fontSize: 14, color: "#666", marginLeft: 10 },
  courseTextSelected: { color: "#fff" },
});
