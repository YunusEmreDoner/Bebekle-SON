import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NewsCard({ category, categoryColor, title, time, thumbColor, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.left}>
        <Text style={[styles.category, { color: categoryColor || '#C066A0' }]}>{category}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={[styles.thumb, { backgroundColor: thumbColor || '#D4C5F0' }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  category: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D3D3D',
    lineHeight: 18,
    marginBottom: 6,
  },
  time: {
    fontSize: 11,
    color: '#7A7A7A',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
});
