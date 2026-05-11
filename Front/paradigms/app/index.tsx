import {
  Text,
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Majors from "./components/wizard/Majors";
import Summary from "./components/wizard/Summary";
import TakenCourses from "./components/wizard/TakenCourses";
import DesiredCourses from "./components/wizard/Desired"; // Make sure this matches your filename!
import EngineChoice from "./components/wizard/EngineChoice";
import AIPrompt from "./components/wizard/aiprompt"; // Make sure the casing matches your file!

export default function Index() {
  const insets = useSafeAreaInsets();
  const logoSource: ImageSourcePropType | null = require("./assets/uni_logo.jpeg")
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
        style={[
          {
            justifyContent: "center",
            display: "flex",
            paddingTop: insets.top + 24,
          },
          styles.header,
        ]}
      >
        <View style={styles.headerAccent} />
        <View style={styles.brandRow}>
          {logoSource ? (
            <Image source={logoSource} style={styles.logo} resizeMode="contain" />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>AU</Text>
            </View>
          )}
          <View style={styles.brandText}>
            <Text style={styles.title}>Smart Study Advisor</Text>
            <Text style={styles.subtitle}>Alexandria University</Text>
          </View>
        </View>
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
  container: { flex: 1, backgroundColor: "#f7f4ef" },
  header: {
    padding: 24,
    backgroundColor: "#1f2933",
    borderBottomWidth: 1,
    borderColor: "#111827",
    position: "relative",
    overflow: "hidden",
  },
  headerAccent: {
    position: "absolute",
    right: -40,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#c97b45",
    opacity: 0.18,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  brandText: { flex: 1 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  logoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#f0e3d6",
    borderWidth: 1,
    borderColor: "#d6c7b8",
    alignItems: "center",
    justifyContent: "center",
  },
  logoPlaceholderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7a4d2a",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9fafb",
    letterSpacing: 0.4,
    fontFamily: "Georgia",
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  content: { flex: 1, padding: 22 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e6ddd2",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  navButtonPrimary: { backgroundColor: "#c97b45" },
  navButtonPrimaryHovered: { backgroundColor: "#b86b36" },
  navButtonSecondary: { backgroundColor: "#efe6dc" },
  navButtonHovered: { backgroundColor: "#e5dbcf" },
  navButtonPressed: { opacity: 0.7 },
  navButtonTextPrimary: { color: "#fff", fontSize: 16, fontWeight: "600" },
  navButtonTextSecondary: {
    color: "#4b3f35",
    fontSize: 16,
    fontWeight: "600",
  },
});
