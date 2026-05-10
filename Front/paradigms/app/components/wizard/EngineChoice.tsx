import { View, Text, Pressable, StyleSheet } from "react-native";

interface EngineChoiceProps {
  engineChoice: "prolog" | "ai" | "";
  setEngineChoice: (choice: "prolog" | "ai") => void;
}

export default function EngineChoice({
  engineChoice,
  setEngineChoice,
}: EngineChoiceProps) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>How should we build your plan?</Text>
        <Text style={styles.subtitle}>Choose your recommendation engine.</Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Prolog Button */}
        <Pressable
          style={[
            styles.engineCard,
            engineChoice === "prolog" && styles.prologSelected,
          ]}
          onPress={() => setEngineChoice("prolog")}
        >
          <Text
            style={[
              styles.emoji,
              engineChoice === "prolog" && styles.textWhite,
            ]}
          >
            ⚙️
          </Text>
          <Text
            style={[
              styles.cardTitle,
              engineChoice === "prolog" && styles.textWhite,
            ]}
          >
            Prolog Logic
          </Text>
          <Text
            style={[
              styles.cardDesc,
              engineChoice === "prolog" && styles.textWhite,
            ]}
          >
            I want to pick specific topics and let the strict rules engine build
            my schedule.
          </Text>
        </Pressable>

        {/* AI Button */}
        <Pressable
          style={[
            styles.engineCard,
            engineChoice === "ai" && styles.aiSelected,
          ]}
          onPress={() => setEngineChoice("ai")}
        >
          <Text
            style={[styles.emoji, engineChoice === "ai" && styles.textWhite]}
          >
            🤖
          </Text>
          <Text
            style={[
              styles.cardTitle,
              engineChoice === "ai" && styles.textWhite,
            ]}
          >
            AI Advisor
          </Text>
          <Text
            style={[styles.cardDesc, engineChoice === "ai" && styles.textWhite]}
          >
            I want to describe my career goals and let the AI find the perfect
            courses for me.
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  cardsContainer: { gap: 15, marginTop: 10 },

  engineCard: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  prologSelected: { backgroundColor: "#34C759", borderColor: "#34C759" },
  aiSelected: { backgroundColor: "#5856D6", borderColor: "#5856D6" },

  emoji: { fontSize: 40, marginBottom: 10 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  textWhite: { color: "#fff" },
});
