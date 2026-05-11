import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRecommendations } from "../services/api";

export default function ResultsScreen() {
  const router = useRouter();
  const { requestData, isAI } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (requestData && isAI) {
        const payload = JSON.parse(requestData as string);
        const isAIEngine = isAI === "true";

        const results = await getRecommendations(payload, isAIEngine);

        setResultData(results);
        setLoading(false);
      }
    };

    fetchResults();
  }, [requestData, isAI]);

  // Reusable helper component to render a course card
  const CourseCard = ({ course }: { course: any }) => (
    <View style={styles.courseCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.courseId}>{course.id}</Text>
        {/* FIX #1: Tell it to use either the Django key (course_name) OR the mock key (name) */}
        <Text style={styles.courseName}>
          {course.course_name || course.name}
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{course.difficulty}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Study Plan</Text>
        <Text style={styles.subtitle}>
          Powered by {isAI === "true" ? "AI Advisor 🤖" : "Prolog Engine ⚙️"}
        </Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator
              size="large"
              color={isAI === "true" ? "#5856D6" : "#34C759"}
            />
            <Text style={styles.loadingText}>
              {isAI === "true"
                ? "Consulting AI Advisor..."
                : "Querying Prolog Engine..."}
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* ========================================== */}
            {/* AI ENGINE LAYOUT                           */}
            {/* ========================================== */}
            {isAI === "true" && resultData && (
              <View>
                <View style={styles.aiReasoningBox}>
                  <Text style={styles.aiReasoningTitle}>AI Reasoning:</Text>
                  <Text style={styles.aiReasoningText}>
                    {/* {resultData.reasoning} */}
                  </Text>
                </View>

                <Text style={styles.resultHeader}>Recommended Courses:</Text>
                {/* Fallback to checking both spellings just in case! */}
                {(
                  resultData.recommened_courses ||
                  resultData.recommended_courses
                )?.map((courseName: string, idx: number) => {
                  const formattedCourse = {
                    id: `AI-${idx + 1}`,
                    name: courseName,
                    difficulty: "AI Pick",
                  };
                  return (
                    <CourseCard key={`ai-${idx}`} course={formattedCourse} />
                  );
                })}
              </View>
            )}

            {/* ========================================== */}
            {/* PROLOG ENGINE LAYOUT                       */}
            {/* ========================================== */}
            {isAI === "false" && resultData && (
              <View>
                {resultData.prefered?.length > 0 && (
                  <View style={styles.section}>
                    <Text style={[styles.resultHeader, { color: "#007AFF" }]}>
                      ★ Matches Your Interests
                    </Text>
                    {resultData.prefered.map((course: any, idx: number) => (
                      <CourseCard key={`pref-${idx}`} course={course} />
                    ))}
                  </View>
                )}

                {resultData.not_prefered_easy?.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.resultHeader}>Light Load (Easy)</Text>
                    {/* FIX #3: Iterate over the exact key from the backend! */}
                    {resultData.not_prefered_easy.map(
                      (course: any, idx: number) => (
                        <CourseCard key={`easy-${idx}`} course={course} />
                      ),
                    )}
                  </View>
                )}

                {resultData.not_prefered_med?.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.resultHeader}>
                      Balanced Load (Medium)
                    </Text>
                    {resultData.not_prefered_med.map(
                      (course: any, idx: number) => (
                        <CourseCard key={`med-${idx}`} course={course} />
                      ),
                    )}
                  </View>
                )}

                {resultData.not_prefered_hard?.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.resultHeader}>Heavy Load (Hard)</Text>
                    {resultData.not_prefered_hard.map(
                      (course: any, idx: number) => (
                        <CourseCard key={`hard-${idx}`} course={course} />
                      ),
                    )}
                  </View>
                )}
              </View>
            )}

            <Pressable
              style={styles.homeButton}
              onPress={() => router.push("/")}
            >
              <Text style={styles.homeButtonText}>Start Over</Text>
            </Pressable>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 20,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 },
  content: { flex: 1, padding: 20 },

  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "#333",
  },

  section: { marginBottom: 20 },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },

  aiReasoningBox: {
    backgroundColor: "#f0f0ff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#d0d0ff",
  },
  aiReasoningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5856D6",
    marginBottom: 8,
  },
  aiReasoningText: { fontSize: 15, color: "#333", lineHeight: 22 },

  courseCard: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseId: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseName: { fontSize: 18, fontWeight: "600", color: "#333" },
  courseFocus: { fontSize: 13, color: "#888", marginTop: 4 },
  badge: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", color: "#555" },

  homeButton: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  homeButtonText: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
});
