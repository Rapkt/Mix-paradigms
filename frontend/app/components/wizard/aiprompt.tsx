import { Keyboard, View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useEffect ,useState } from "react";
interface AIPromptProps {
  aiPrompt: string;
  setAiPrompt: (text: string) => void;
}

export default function AIPrompt({ aiPrompt, setAiPrompt }: AIPromptProps) {

  const [isKeyboardVisible , setIsKeyboardVisible] = useState(false);

  useEffect(()=>{
    const showSubscription = Keyboard.addListener('keyboardDidShow',handelKeyboardShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide',handelKeyboardHide);
  
      return ()=>{
        showSubscription.remove();
        hideSubscription.remove();
      };
  },[]);

  const handelKeyboardShow = () =>{
    setIsKeyboardVisible(true);
  };
  const handelKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.stepTitle}>Tell the AI your goals</Text>
        <Text style={styles.subtitle}>
          What are you trying to achieve? (e.g., I want to become a Data
          Scientist, or I need easy electives this semester).
        </Text>
      </View>
      {isKeyboardVisible && <Button title="Dismiss keyboard" onPress={Keyboard.dismiss} />}
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
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1f2933",
    fontFamily: "Georgia",
  },
  subtitle: { fontSize: 14, color: "#6b5e53", marginBottom: 20, lineHeight: 20 },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6ddd2",
    borderRadius: 16,
    padding: 15,
    fontSize: 16,
    color: "#2f241c",
    minHeight: 200,
    shadowColor: "#1f2933",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
