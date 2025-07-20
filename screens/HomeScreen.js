import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            alert('Saved!');
        } else {
            alert('Already saved!');
        }
        } catch (err) {
        console.error('Save error:', err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>WINGMAN 👔</Text>

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

            <TouchableOpacity onPress={() => navigation.navigate('Saved')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>📂 View Saved</Text>
            </TouchableOpacity>

            <StatusBar style="light" />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c084fc',
    marginBottom: 30,
  },
  promptBox: {
    backgroundColor: '#1e1b33',
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 30,
    maxWidth: 320,
  },
  promptText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  sliderLabel: {
    color: '#aaa',
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
    backgroundColor: '#c084fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 110,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#292929',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#eee',
    fontWeight: '600',
  },
});

