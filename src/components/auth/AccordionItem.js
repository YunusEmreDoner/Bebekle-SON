import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccordionItem({ title, isOpen, onToggle, dateValue, onDateChange }) {
  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <Text style={[styles.title, isOpen && styles.titleOpen]}>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={isOpen ? '#C066A0' : '#7A7A7A'}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            value={dateValue}
            onChangeText={onDateChange}
            placeholder="GG/AA/YYYY"
            placeholderTextColor="#7A7A7A"
            keyboardType="numeric"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  containerOpen: {
    borderColor: '#C066A0',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D3D3D',
    flex: 1,
  },
  titleOpen: {
    color: '#C066A0',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#3D3D3D',
    backgroundColor: '#F5F5F5',
  },
});
