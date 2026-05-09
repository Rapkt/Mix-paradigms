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

  // Grab the data we passed from Step 4
  const { requestData, isAI } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (requestData && isAI) {
        const payload = JSON.parse(requestData as string);
        const results = await getRecommendations(payload, isAI === "true");

        setRecommendedCourses(results as any[]);
        setLoading(false);
      }
    };

    fetchResults();
  }, [requestData, isAI]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Study Plan</Text>
        <Text style={styles.subtitle}>Powered by Prolog</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          // The Loading State
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Analyzing prerequisites...</Text>
            <Text style={styles.loadingSubtext}>
              Querying Prolog inference engine
            </Text>
          </View>
        ) : (
          // The Results State
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.resultHeader}>Recommended For You:</Text>

            {recommendedCourses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <View>
                  <Text style={styles.courseId}>{course.id}</Text>
                  <Text style={styles.courseName}>{course.name}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{course.difficulty}</Text>
                </View>
              </View>
            ))}

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
    backgroundColor: "#007AFF",
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
  loadingSubtext: { fontSize: 14, color: "#666", marginTop: 5 },

  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
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
  courseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    maxWidth: "80%",
  },
  badge: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", color: "#555" },

  homeButton: {
    marginTop: 30,
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  homeButtonText: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
});
