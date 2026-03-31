import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DotIndicator({ total, active }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i === active && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8E0E5',
  },
  dotActive: {
    backgroundColor: '#C066A0',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
