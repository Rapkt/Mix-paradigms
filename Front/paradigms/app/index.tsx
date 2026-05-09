import {
  Text,
  Pressable,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Majors from "./components/wizard/Majors";
import TakenCourses from "./components/wizard/TakenCourses";
import DesiredCourses from "./components/wizard/Desired";
import Recommendation from "./components/wizard/Recommendation";

export default function Index() {
  const [step, setStep] = useState<number>(1);
  const [major, setMajor] = useState<string>("");
  const [takenCourses, setTakenCourses] = useState<string[]>([]);
  const [desiredCourses, setDesiredCourses] = useState<string[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(1);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[{ justifyContent: "center", display: "flex" }, styles.header]}
      >
        <Text
          style={[styles.title, { justifyContent: "center", display: "flex" }]}
        >
          Smart Study Advisor
        </Text>
      </View>
      <View style={styles.content}>
        {/* Step 1: Major Selection */}
        {step === 1 && (
          <Majors
            major={major}
            setMajor={setMajor}
            setTakenCourses={setTakenCourses}
            setDesiredCourses={setDesiredCourses}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
          />
        )}
        {step === 2 && (
          <TakenCourses
            major={major}
            takenCourses={takenCourses}
            setTakenCourses={setTakenCourses}
            currentYear={currentYear}
          />
        )}
        {step === 3 && (
          <DesiredCourses
            major={major}
            takenCourses={takenCourses}
            desiredCourses={desiredCourses}
            setDesiredCourses={setDesiredCourses}
            currentYear={currentYear}
          />
        )}
        {step === 4 && (
          <Recommendation
            major={major}
            takenCourses={takenCourses}
            desiredCourses={desiredCourses}
            currentYear={currentYear}
          />
        )}
      </View>
      {/* Navigation Footer */}
      <View style={styles.footer}>
        {step > 1 ? (
          <Pressable
            onPress={handlePreviousStep}
            style={({ hovered, pressed }) => [
              styles.navButton,
              styles.navButtonSecondary,
              hovered && styles.navButtonHovered, // Turns darker gray on web hover
              pressed && styles.navButtonPressed, // Fades slightly when clicked
            ]}
          >
            <Text style={styles.navButtonTextSecondary}>Back</Text>
          </Pressable>
        ) : (
          <View /> /* This empty view acts as a placeholder to push "Next" to the right */
        )}
        {step < 4 &&
          (step === 1 && major === "" ? (
            /* The Invisible Clone: Holds the exact space so the page doesn't jump! */
            <View style={[styles.navButton, { opacity: 0 }]}>
              <Text style={styles.navButtonTextPrimary}>Next</Text>
            </View>
          ) : (
            /* The Real Button */
            <Pressable
              onPress={handleNextStep}
              style={({ hovered, pressed }) => [
                styles.navButton,
                styles.navButtonPrimary,
                hovered && styles.navButtonPrimaryHovered,
                pressed && styles.navButtonPressed,
              ]}
            >
              <Text style={styles.navButtonTextPrimary}>Next</Text>
            </Pressable>
          ))}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 5 },
  content: { flex: 1, padding: 20 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  navButtonPrimary: { backgroundColor: "#007AFF" },
  navButtonPrimaryHovered: { backgroundColor: "#0056b3" },
  navButtonSecondary: { backgroundColor: "#f0f0f0" },
  navButtonHovered: { backgroundColor: "#e0e0e0" },
  navButtonPressed: { opacity: 0.7 },
  navButtonTextPrimary: { color: "#fff", fontSize: 16, fontWeight: "600" },
  navButtonTextSecondary: { color: "#333", fontSize: 16, fontWeight: "600" },
});
