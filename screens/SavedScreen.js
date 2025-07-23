import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConversationCard from '../cards/convo-card';

export default function SavedScreen({ navigation }) {
    const [savedPrompts, setSavedPrompts] = useState([]);

    useEffect(() => {
        const fetchSaved = async () => {
        try {
            const stored = await AsyncStorage.getItem('saved_prompts');
            if (stored) setSavedPrompts(JSON.parse(stored));
        } catch (err) {
            console.error("Error loading saved prompts:", err);
        }
        };

        const unsubscribe = navigation.addListener('focus', fetchSaved); // re-fetch on screen focus
        return unsubscribe;
    }, [navigation]);

    const clearAll = async () => {
        await AsyncStorage.removeItem('saved_prompts');
        setSavedPrompts([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Saved Prompts ❤️</Text>
            
            <FlatList
            data={savedPrompts}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
                <ConversationCard text={item} onLikePress={() => {}} />
            )}
            ListEmptyComponent={<Text style={styles.empty}>No saved prompts yet.</Text>}
            />

            <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
            <Text style={styles.clearText}>🗑️ Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    padding: 24,
  },
  header: {
    fontSize: 26,
    color: '#ec008c',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  prompt: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  empty: {
    color: '#777',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 30,
    backgroundColor: '#ec008c',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
  },
  backText: {
    color: '#444',
    fontSize: 14,
  },
});

