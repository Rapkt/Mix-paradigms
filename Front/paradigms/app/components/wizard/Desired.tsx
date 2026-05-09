import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { DUMMY_COURSES } from "../../../constants/courses";

interface Step3Props {
  major: string;
  takenCourses: string[];
  desiredCourses: string[];
  setDesiredCourses: (courses: string[]) => void;
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

  // 1. Get courses for the major AND filter out ones they already took!
  const availableMajorCourses = DUMMY_COURSES.filter(
    (c) => c.major === major && !takenCourses.includes(c.id),
  );

  // 2. Find out which years are left
  const availableYears = Array.from(
    new Set(availableMajorCourses.map((c) => c.year)),
  ).sort((a, b) => a - b);

  // 3. Filter list by the active tab
  const displayedCourses = availableMajorCourses.filter(
    (c) => c.year === activeTab,
  );

  const toggleCourse = (courseId: string) => {
    if (desiredCourses.includes(courseId)) {
      setDesiredCourses(desiredCourses.filter((id) => id !== courseId));
    } else {
      setDesiredCourses([...desiredCourses, courseId]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>What do you want to take next?</Text>
        <Text style={styles.subtitle}>
          Total desired: {desiredCourses.length}
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
        {displayedCourses.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#999",
              fontStyle: "italic",
            }}
          >
            No courses available for Year {activeTab}.
          </Text>
        ) : (
          displayedCourses.map((course) => {
            const isDesired = desiredCourses.includes(course.id);
            return (
              <Pressable
                key={course.id}
                style={[
                  styles.courseCard,
                  isDesired && styles.courseCardDesired,
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <Text
                  style={[
                    styles.courseName,
                    isDesired && styles.courseTextSelected,
                  ]}
                >
                  {course.id}: {course.name}
                </Text>
                <Text
                  style={[
                    styles.courseDifficulty,
                    isDesired && styles.courseTextSelected,
                  ]}
                >
                  {course.difficulty}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseCardDesired: { backgroundColor: "#FF9500", borderColor: "#FF9500" }, // Orange!
  courseName: { fontSize: 16, fontWeight: "500", color: "#333", flex: 1 },
  courseDifficulty: { fontSize: 14, color: "#666", marginLeft: 10 },
  courseTextSelected: { color: "#fff" },
});
