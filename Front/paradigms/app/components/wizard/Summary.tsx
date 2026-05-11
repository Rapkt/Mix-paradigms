import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { COURSES } from "../../../constants/courses";

interface Step5Props {
  major: string;
  currentYear: number;
  takenCourses: string[];
  desiredCourses: string[];
  engineChoice: "prolog" | "ai" | "";
  aiPrompt: string;
}

export default function Summary({
  major,
  currentYear,
  takenCourses,
  desiredCourses,
  engineChoice,
  aiPrompt,
}: Step5Props) {
  const router = useRouter();

  const getCourseName = (id: string) => {
    const course = COURSES.find((c) => c.id === id || c.name === id);
    return course ? `${course.id}: ${course.name}` : id;
  };

  const handleSubmit = () => {
    // 1. Build a super clean payload based on their path!
    const payload = {
      department: major,
      academic_year: currentYear,
      completed_courses: takenCourses,
      // If they chose Prolog, send the topics. If AI, send the prompt string!
      ...(engineChoice === "prolog"
        ? { preferences: desiredCourses }
        : { preferences: [aiPrompt] }),
    };

    // 2. Send it to the Results screen
    router.push({
      pathname: "/results",
      params: {
        requestData: JSON.stringify(payload),
        isAI: engineChoice === "ai" ? "true" : "false",
      },
    });
  };

  const isAI = engineChoice === "ai";

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>Review Your Request</Text>
      </View>

      <ScrollView
        style={{ flex: 1, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Profile:</Text>
          <Text style={styles.cardValue}>
            {major} - Year {currentYear}
          </Text>
        </View>

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

        {/* DYNAMIC RENDER based on the path they took! */}
        {isAI ? (
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>AI Prompt:</Text>
            <Text style={styles.promptText}>
              {aiPrompt || "No prompt provided."}
            </Text>
          </View>
        ) : (
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>
              Desired Topics ({desiredCourses.length}):
            </Text>
            {desiredCourses.length === 0 ? (
              <Text style={styles.emptyText}>None selected</Text>
            ) : (
              desiredCourses.map((topic) => (
                <Text key={topic} style={styles.listItem}>
                  • {topic}
                </Text>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* A single dynamic submit button! */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          isAI ? styles.aiButton : styles.prologButton,
          pressed && styles.pressed,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {isAI ? "Consult AI Advisor 🤖" : "Ask Prolog Engine ⚙️"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
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
  promptText: {
    fontSize: 15,
    color: "#444",
    fontStyle: "italic",
    lineHeight: 22,
  },

  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  prologButton: { backgroundColor: "#34C759" },
  aiButton: { backgroundColor: "#5856D6" },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
