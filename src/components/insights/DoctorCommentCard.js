import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DoctorCommentCard({ name, specialty, comment, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Dr</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.specialty}>{specialty}</Text>
        </View>
      </View>
      <Text style={styles.comment}>"{comment}"</Text>
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
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9B5CC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  specialty: {
    fontSize: 11,
    color: '#7A7A7A',
  },
  comment: {
    fontSize: 13,
    color: '#3D3D3D',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
