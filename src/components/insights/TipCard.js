import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TipCard({ icon, iconColor, iconBg, title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D3D3D',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 16,
  },
});
