import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';

// Temporary prompt pool for prototype
const prompts = {
  silly: [
    "If you were a vegetable, what would you be?",
    "What’s your spirit animal, but wrong?",
    "Pineapple on pizza: yes or absolutely yes?"
  ],
  casual: [
    "What’s your beige flag?",
    "What’s the most spontaneous thing you’ve done?",
    "Go-to comfort movie?"
  ],
  sophisticated: [
    "How would your friends describe you in one word?",
    "If you could master any skill instantly, what would it be?",
    "What philosophy do you try to live by?"
  ]
};

export default function App() {
  const [tone, setTone] = useState(0.5); // 0 = silly, 1 = sophisticated
  const [prompt, setPrompt] = useState("Tap shuffle to get a conversation starter!");

  const getToneCategory = () => {
    if (tone < 0.33) return 'silly';
    if (tone < 0.66) return 'casual';
    return 'sophisticated';
  };

  const shufflePrompt = () => {
    const category = getToneCategory();
    const options = prompts[category];
    const randomPrompt = options[Math.floor(Math.random() * options.length)];
    setPrompt(randomPrompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>WINGMAN 👔</Text>

      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>

      <Text style={styles.sliderLabel}>Tone: {getToneCategory()}</Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={tone}
        onValueChange={setTone}
        minimumTrackTintColor="#c084fc"
        maximumTrackTintColor="#000000"
      />

      <TouchableOpacity onPress={shufflePrompt} style={styles.shuffleButton}>
        <Text style={styles.buttonText}>🔄 Shuffle</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0c1f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c084fc',
    marginBottom: 30,
  },
  promptBox: {
    backgroundColor: '#1e1b33',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  promptText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  sliderLabel: {
    color: '#aaa',
    marginBottom: 10,
  },
  shuffleButton: {
    backgroundColor: '#c084fc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
