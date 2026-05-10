import { View, Text, StyleSheet, TextInput } from "react-native";

interface AIPromptProps {
  aiPrompt: string;
  setAiPrompt: (text: string) => void;
}

export default function AIPrompt({ aiPrompt, setAiPrompt }: AIPromptProps) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>Tell the AI your goals</Text>
        <Text style={styles.subtitle}>
          What are you trying to achieve? (e.g., I want to become a Data
          Scientist, or I need easy electives this semester).
        </Text>
      </View>

      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={8} // Makes it tall on Android
        placeholder="Type your goals here..."
        placeholderTextColor="#999"
        value={aiPrompt}
        onChangeText={setAiPrompt}
        textAlignVertical="top" // Ensures text starts at the top on Android
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20, lineHeight: 20 },
  textInput: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333",
    minHeight: 200,
  },
});
