import { Text, Pressable, View, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import Majors from "./components/wizard/Majors";
import Summary from "./components/wizard/Summary";
import TakenCourses from "./components/wizard/TakenCourses";
import DesiredCourses from "./components/wizard/Desired"; // Make sure this matches your filename!
import EngineChoice from "./components/wizard/EngineChoice";
import AIPrompt from "./components/wizard/aiprompt"; // Make sure the casing matches your file!

export default function Index() {
  const [step, setStep] = useState<number>(1);
  const [major, setMajor] = useState<string>("");
  const [takenCourses, setTakenCourses] = useState<string[]>([]);
  const [desiredCourses, setDesiredCourses] = useState<string[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(1);

  const [engineChoice, setEngineChoice] = useState<"prolog" | "ai" | "">("");
  const [aiPrompt, setAiPrompt] = useState<string>("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // This function checks if the user is allowed to proceed
  const canGoNext = () => {
    if (step === 1 && major === "") return false;
    if (step === 3 && engineChoice === "") return false;
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[{ justifyContent: "center", display: "flex" }, styles.header]}
      >
        <Text style={[styles.title, { textAlign: "center" }]}>
          Smart Study Advisor
        </Text>
      </View>

      <View style={styles.content}>
        {/* Step 1: Major & Year Selection */}
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

        {/* Step 2: Taken Courses */}
        {step === 2 && (
          <TakenCourses
            major={major}
            takenCourses={takenCourses}
            setTakenCourses={setTakenCourses}
            currentYear={currentYear}
          />
        )}

        {/* Step 3: Engine Choice */}
        {step === 3 && (
          <EngineChoice
            engineChoice={engineChoice}
            setEngineChoice={setEngineChoice}
          />
        )}

        {/* STEP 4: The Branch (Prolog OR AI) */}
        {step === 4 && engineChoice === "prolog" && (
          <DesiredCourses
            major={major}
            takenCourses={takenCourses}
            desiredCourses={desiredCourses}
            setDesiredCourses={setDesiredCourses}
            currentYear={currentYear}
          />
        )}

        {step === 4 && engineChoice === "ai" && (
          <AIPrompt aiPrompt={aiPrompt} setAiPrompt={setAiPrompt} />
        )}

        {/* STEP 5: Final Summary */}
        {step === 5 && (
          <Summary
            major={major}
            currentYear={currentYear}
            takenCourses={takenCourses}
            desiredCourses={desiredCourses}
            engineChoice={engineChoice}
            aiPrompt={aiPrompt}
          />
        )}
      </View>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        {/* Back Button */}
        {step > 1 ? (
          <Pressable
            onPress={handlePreviousStep}
            style={({ hovered, pressed }) => [
              styles.navButton,
              styles.navButtonSecondary,
              hovered && styles.navButtonHovered,
              pressed && styles.navButtonPressed,
            ]}
          >
            <Text style={styles.navButtonTextSecondary}>Back</Text>
          </Pressable>
        ) : (
          <View /> /* Spacer to push Next button to the right */
        )}

        {/* Next Button */}
        {step < 5 &&
          (canGoNext() ? (
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
          ) : (
            /* Invisible button to hold space when they haven't made a choice yet */
            <View style={[styles.navButton, { opacity: 0 }]}>
              <Text style={styles.navButtonTextPrimary}>Next</Text>
            </View>
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
