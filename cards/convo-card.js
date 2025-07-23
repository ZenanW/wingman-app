import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or any other icon lib

export default function ConversationCard({ text, onLikePress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.iconWrapper} onPress={onLikePress}>
        <Ionicons name="heart-outline" size={24} color="#ec008c" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    paddingRight: 40, // spacing to avoid overlap with icon
  },
  iconWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
});
