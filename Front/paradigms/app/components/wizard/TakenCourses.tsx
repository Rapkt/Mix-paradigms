import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import {
  COURSES,
  PREPARATORY_DEPARTMENT,
} from "../../../constants/courses";
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

  // 1. Get courses for the major, plus preparatory year courses if available
  const majorCourses = COURSES.filter(
    (c) => c.major === major || c.major === PREPARATORY_DEPARTMENT,
  );

  // 2. Dynamically figure out what years actually exist for this major (e.g., [1, 2, 3, 4, 5])
  const availableYears = Array.from(
    new Set(majorCourses.map((c) => c.year)),
  ).sort((a, b) => a - b);

  // 3. Get ONLY the courses that match the currently clicked tab
  const displayedCourses = majorCourses.filter((c) => c.year === activeTab);

  const displayedCourseNames = displayedCourses.map((course) => course.name);
  const allDisplayedSelected =
    displayedCourseNames.length > 0 &&
    displayedCourseNames.every((name) => takenCourses.includes(name));

  const toggleCourse = (courseId: string) => {
    if (takenCourses.includes(courseId)) {
      setTakenCourses(takenCourses.filter((id) => id !== courseId));
    } else {
      setTakenCourses([...takenCourses, courseId]);
    }
  };

  const toggleAllDisplayed = () => {
    if (displayedCourseNames.length === 0) return;

    if (allDisplayedSelected) {
      setTakenCourses(
        takenCourses.filter((name) => !displayedCourseNames.includes(name)),
      );
      return;
    }

    const combined = new Set([...takenCourses, ...displayedCourseNames]);
    setTakenCourses(Array.from(combined));
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

      <View style={styles.actionsRow}>
        <Text style={styles.actionsLabel}>Courses in Year {activeTab}</Text>
        <Pressable
          style={[
            styles.selectAllButton,
            allDisplayedSelected && styles.selectAllButtonActive,
            displayedCourseNames.length === 0 && styles.selectAllButtonDisabled,
          ]}
          onPress={toggleAllDisplayed}
        >
          <Text
            style={[
              styles.selectAllText,
              allDisplayedSelected && styles.selectAllTextActive,
            ]}
          >
            {allDisplayedSelected ? "Clear all" : "Select all"}
          </Text>
        </Pressable>
      </View>

      {/* THE FILTERED COURSE LIST */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {displayedCourses.map((course) => {
          const isTaken = takenCourses.includes(course.name);
          return (
            <Pressable
              key={course.id}
              style={[styles.courseCard, isTaken && styles.courseCardSelected]}
              onPress={() => toggleCourse(course.name)}
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
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1f2933",
    fontFamily: "Georgia",
  },
  subtitle: { fontSize: 14, color: "#6b5e53", marginBottom: 15 },

  // Tab Styles
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#e6ddd2",
    paddingBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f3eee7",
  },
  activeTab: { backgroundColor: "#1f2933" },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#6b5e53" },
  activeTabText: { color: "#fff" },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  actionsLabel: { fontSize: 14, color: "#6b5e53", fontWeight: "600" },
  selectAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#c97b45",
    backgroundColor: "#fff",
  },
  selectAllButtonActive: { backgroundColor: "#c97b45" },
  selectAllButtonDisabled: { opacity: 0.5 },
  selectAllText: { fontSize: 13, fontWeight: "600", color: "#c97b45" },
  selectAllTextActive: { color: "#fff" },

  // Course Card Styles
  courseCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e6ddd2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#1f2933",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  courseCardSelected: { backgroundColor: "#1f8a70", borderColor: "#1f8a70" },
  courseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2f241c",
    flex: 1,
  },
  courseDifficulty: { fontSize: 14, color: "#6b5e53", marginLeft: 10 },
  courseTextSelected: { color: "#fff" },
});
