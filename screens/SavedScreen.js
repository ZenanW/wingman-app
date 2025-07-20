import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            renderItem={({ item }) => <Text style={styles.prompt}>{item}</Text>}
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
    container: { flex: 1, backgroundColor: '#0e0c1f', padding: 20 },
    header: { fontSize: 24, color: '#c084fc', fontWeight: 'bold', marginBottom: 20 },
    prompt: { fontSize: 16, color: '#fff', paddingVertical: 10 },
    empty: { color: '#888', marginTop: 40, textAlign: 'center' },
    clearButton: {
        marginTop: 20,
        backgroundColor: '#441c2e',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    clearText: { color: '#f88', fontWeight: 'bold' },
    backButton: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
    },
    backText: { color: '#aaa' },
});
