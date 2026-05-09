import { View, Text, Pressable, StyleSheet } from "react-native";
import { MAJORS } from "@/constants/courses";
interface Step1 {
  major: string;
  setMajor: (major: string) => void;
  setTakenCourses: (courses: string[]) => void;
  setDesiredCourses: (courses: string[]) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

export default function Majors({
  major,
  setMajor,
  setTakenCourses,
  setDesiredCourses,
  currentYear,
  setCurrentYear,
}: Step1) {
  const YEARS = [1, 2, 3, 4, 5];
  return (
    <View style={{ flex: 1 }}>
      {/* MAJOR SELECTION */}
      <View>
        <Text style={styles.stepTitle}>What is your Major?</Text>
      </View>

      <View style={styles.optionsContainer}>
        {MAJORS.map((m) => (
          <Pressable
            key={m}
            style={[
              styles.optionButton,
              major === m && styles.optionButtonSelected,
            ]}
            onPress={() => {
              setMajor(m);
              setTakenCourses([]);
              setDesiredCourses([]);
            }}
          >
            <Text
              style={[
                styles.optionText,
                major === m && styles.optionTextSelected,
              ]}
            >
              {m}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* YEAR SELECTION (Only show if a major is picked!) */}
      {major !== "" && (
        <View style={{ marginTop: 40 }}>
          <Text style={styles.stepTitle}>What is your Current Year?</Text>
          <View style={styles.optionsContainer}>
            {YEARS.map((y) => (
              <Pressable
                key={y}
                style={[
                  styles.optionButton,
                  currentYear === y && styles.optionButtonSelected,
                ]}
                onPress={() => setCurrentYear(y)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentYear === y && styles.optionTextSelected,
                  ]}
                >
                  Year {y}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionButtonSelected: { backgroundColor: "#007AFF", borderColor: "#007AFF" },
  optionText: { fontSize: 16, color: "#333", fontWeight: "500" },
  optionTextSelected: { color: "#fff" },
});
