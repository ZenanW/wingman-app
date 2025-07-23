import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const prompts = {
    silly: [
        "If you were a vegetable, what would you be?",
        "What's your spirit animal, but wrong?",
        "Pineapple on pizza: yes or absolutely yes?"
    ],
    casual: [
        "What's your beige flag?",
        "What's the most spontaneous thing you've done?",
        "Go-to comfort movie?"
    ],
    sophisticated: [
        "How would your friends describe you in one word?",
        "If you could master any skill instantly, what would it be?",
        "What philosophy do you try to live by?"
    ]
};

export default function HomeScreen({ navigation }) {
    const [tone, setTone] = useState(0.5);
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

    const savePrompt = async () => {
      try {
        const stored = await AsyncStorage.getItem('saved_prompts');
        const current = stored ? JSON.parse(stored) : [];
        if (!current.includes(prompt)) {
          const updated = [...current, prompt];
          await AsyncStorage.setItem('saved_prompts', JSON.stringify(updated));
          Toast.show({
            type: 'success',
            text1: 'Saved!',
            position: 'top',
            visibilityTime: 1500,
          });
        } else {
          Toast.show({
            type: 'info',
            text1: '💾 Already saved',
            position: 'top',
            visibilityTime: 1500,
          });
        }
      } catch (err) {
        console.error('Save error:', err);
        Toast.show({
          type: 'error',
          text1: '❌ Error saving prompt',
        });
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>WINGMAN ❤️</Text>

            <View style={styles.promptBox}>
            <Text style={styles.promptText}>{prompt}</Text>
            </View>

            <Text style={styles.sliderLabel}>Tone: {getToneCategory()}</Text>
            <Slider
            style={{ width: 280, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={tone}
            onValueChange={setTone}
            minimumTrackTintColor="#c084fc"
            maximumTrackTintColor="#444"
            thumbTintColor="#fff"
            />

            <View style={styles.buttonRow}>
            <TouchableOpacity onPress={shufflePrompt} style={styles.primaryButton}>
                <Text style={styles.buttonText}>🔄 Shuffle</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={savePrompt} style={styles.primaryButton}>
                <Text style={styles.buttonText}>❤️ Save</Text>
            </TouchableOpacity>
            </View>

            <StatusBar style="light" />

            <Toast config={{
              success: ({ text1 }) => (
                <View style={{
                  backgroundColor: '#ec008c',
                  padding: 14,
                  borderRadius: 16,
                  marginBottom: 20,
                }}>
                  <Text style={{ color: 'white', fontWeight: '600' }}>{text1}</Text>
                </View>
              ),
            }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd', // light background instead of dark
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ec008c', // bright pink
    marginBottom: 30,
  },
  promptBox: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 30,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  promptText: {
    fontSize: 18,
    color: '#333', // dark grey
    textAlign: 'center',
    lineHeight: 26,
  },
  sliderLabel: {
    color: '#555',
    marginTop: 10,
    marginBottom: 6,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#ec008c', // bold pink
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 110,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#3c1aff', // deep indigo start of gradient
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginTop: 30,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});


