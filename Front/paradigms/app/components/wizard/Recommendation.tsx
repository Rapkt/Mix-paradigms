import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { DUMMY_COURSES } from "../../../constants/courses";
import { useRouter } from "expo-router";

interface Step4Props {
  major: string;
  takenCourses: string[];
  desiredCourses: string[];
  currentYear: number;
  engineChoise: "prolog" | "ai" | "";
}

export default function Recommendation({
  major,
  takenCourses,
  desiredCourses,
  currentYear,
  engineChoise,
}: Step4Props) {
  // Helper to get the full course name from an ID
  const getCourseName = (id: string) => {
    const course = DUMMY_COURSES.find((c) => c.id === id);
    return course ? `${course.id}: ${course.name}` : id;
  };
  const router = useRouter();
  const handleSubmit = (isAI: boolean) => {
    const payload = {
      student_major: major,
      completed_courses: takenCourses,
      requested_courses: desiredCourses,
      currentYear: currentYear,
    };
    router.push({
      pathname: "/results",
      params: { requestData: JSON.stringify(payload), isAI: String(isAI) },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>Review Your Request</Text>
        <Text style={styles.subtitle}>Make sure everything looks correct.</Text>
      </View>

      <ScrollView
        style={{ flex: 1, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Major Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Selected Major:</Text>
          <Text style={styles.cardValue}>{major}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Selected Engine:</Text>
          <Text style={styles.cardValue}>{engineChoise}</Text>
        </View>

        {/* Taken Courses Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>
            Completed Courses ({takenCourses.length}):
          </Text>
          {takenCourses.length === 0 ? (
            <Text style={styles.emptyText}>None selected</Text>
          ) : (
            takenCourses.map((id) => (
              <Text key={id} style={styles.listItem}>
                • {getCourseName(id)}
              </Text>
            ))
          )}
        </View>

        {/* Desired Courses Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>
            Desired fileds ({desiredCourses.length}):
          </Text>
          {desiredCourses.length === 0 ? (
            <Text style={styles.emptyText}>None selected</Text>
          ) : (
            desiredCourses.map((id) => (
              <Text key={id} style={styles.listItem}>
                • {getCourseName(id)}
              </Text>
            ))
          )}
        </View>
      </ScrollView>

      {/* The Final Submit Button */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={() => handleSubmit(false)}
        >
          <Text style={styles.submitButtonText}>Ask Prolog Engine </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={() => handleSubmit(true)}
        >
          <Text style={styles.submitButtonText}>Ask AI 🤖</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666" },
  summaryCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardValue: { fontSize: 16, color: "#007AFF", fontWeight: "600" },
  listItem: { fontSize: 15, color: "#444", marginBottom: 4, marginLeft: 5 },
  emptyText: { fontSize: 15, color: "#999", fontStyle: "italic" },

  submitButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
