import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>Tümünü gör</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  seeAll: {
    fontSize: 13,
    color: '#C066A0',
    fontWeight: '500',
  },
});
