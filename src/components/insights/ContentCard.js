import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContentCard({ title, tag, sub, bgColor, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.top, { backgroundColor: bgColor }]}>
        {tag ? (
          <View style={styles.tagBox}>
            <Text style={[styles.tagText, { color: bgColor === '#D4C5F0' ? '#9B5CC4' : '#C066A0' }]}>
              {tag}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 160,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    overflow: 'hidden',
  },
  top: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bottom: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3D3D3D',
    marginBottom: 4,
  },
  sub: {
    fontSize: 11,
    color: '#7A7A7A',
  },
});
