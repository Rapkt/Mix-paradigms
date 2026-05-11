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
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1f2933",
    fontFamily: "Georgia",
  },
  subtitle: { fontSize: 14, color: "#6b5e53", marginBottom: 20 },
  cardsContainer: { gap: 15, marginTop: 10 },

  engineCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e6ddd2",
    alignItems: "center",
    shadowColor: "#1f2933",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  prologSelected: { backgroundColor: "#1f8a70", borderColor: "#1f8a70" },
  aiSelected: { backgroundColor: "#304c89", borderColor: "#304c89" },

  emoji: { fontSize: 40, marginBottom: 10 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f241c",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6b5e53",
    textAlign: "center",
    lineHeight: 20,
  },
  textWhite: { color: "#fff" },
});
