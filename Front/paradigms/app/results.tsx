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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRecommendations } from "../services/api";

export default function ResultsScreen() {
  const router = useRouter();
  const { requestData, isAI } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);
  const [studentYear, setStudentYear] = useState<number>(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (requestData && isAI) {
        const payload = JSON.parse(requestData as string);
        const isAIEngine = isAI === "true";
        
        // Extract student's academic year
        setStudentYear(payload.academic_year || 1);

        const results = await getRecommendations(payload, isAIEngine);

        setResultData(results);
        setLoading(false);
      }
    };

    fetchResults();
  }, [requestData, isAI]);

  // Reusable helper component to render a course card
  const CourseCard = ({ course }: { course: any }) => {
    const isCurrentYear = course.year === studentYear;
    return (
      <View style={[styles.courseCard, isCurrentYear && styles.courseCardCurrentYear]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.courseId, isCurrentYear && styles.courseIdCurrentYear]}>{course.id}</Text>
          {/* FIX #1: Tell it to use either the Django key (course_name) OR the mock key (name) */}
          <Text style={[styles.courseName, isCurrentYear && styles.courseNameCurrentYear]}>
            {course.course_name || course.name}
          </Text>
          <Text style={[styles.courseMeta, isCurrentYear && styles.courseMetaCurrentYear]}>
            {course.department ? `Department: ${course.department}` : "Department: N/A"}
          </Text>
          <Text style={[styles.courseMeta, isCurrentYear && styles.courseMetaCurrentYear]}>
            {course.year ? `Year: ${course.year}` : "Year: N/A"}
          </Text>
        </View>
        <View style={[styles.badge, isCurrentYear && styles.badgeCurrentYear]}>
          <Text style={[styles.badgeText, isCurrentYear && styles.badgeTextCurrentYear]}>{course.difficulty}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerAccent} />
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
                  	{resultData.reasoning}
                  </Text>
                </View>

                <Text style={styles.resultHeader}>Recommended Courses:</Text>
                {/* Fallback to checking both spellings just in case! */}
                {(
                  resultData.recommened_courses ||
                  resultData.recommended_courses
                )?.map((course: any, idx: number) => {
                  return (
                    <CourseCard key={`ai-${idx}`} course={course} />
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
  container: { flex: 1, backgroundColor: "#f7f4ef" },
  header: {
    padding: 20,
    backgroundColor: "#1f2933",
    borderBottomWidth: 1,
    borderColor: "#111827",
    position: "relative",
    overflow: "hidden",
  },
  headerAccent: {
    position: "absolute",
    left: -30,
    top: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#c97b45",
    opacity: 0.18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Georgia",
  },
  subtitle: { fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 },
  content: { flex: 1, padding: 20 },

  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "#2f241c",
  },

  section: { marginBottom: 20 },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2f241c",
  },

  aiReasoningBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#e6ddd2",
    shadowColor: "#1f2933",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  aiReasoningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#304c89",
    marginBottom: 8,
  },
  aiReasoningText: { fontSize: 15, color: "#2f241c", lineHeight: 22 },

  courseCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
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
  courseId: {
    fontSize: 14,
    color: "#6b5e53",
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseName: { fontSize: 18, fontWeight: "600", color: "#2f241c" },
  courseMeta: { fontSize: 13, color: "#8a796a", marginTop: 4 },
  courseFocus: { fontSize: 13, color: "#8a796a", marginTop: 4 },
  badge: {
    backgroundColor: "#efe6dc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", color: "#4b3f35" },

  courseCardCurrentYear: {
    backgroundColor: "#fef3c7",
    borderColor: "#fbbf24",
    borderWidth: 2,
  },
  courseIdCurrentYear: { color: "#b45309" },
  courseNameCurrentYear: { color: "#78350f" },
  courseMetaCurrentYear: { color: "#92400e" },
  badgeCurrentYear: { backgroundColor: "#fbbf24" },
  badgeTextCurrentYear: { color: "#78350f" },

  homeButton: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#efe6dc",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: { fontSize: 16, fontWeight: "bold", color: "#c97b45" },
});
