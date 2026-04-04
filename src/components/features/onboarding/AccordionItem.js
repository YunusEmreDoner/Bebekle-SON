import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccordionItem({ title, isOpen, onToggle, dateValue, onDateChange }) {
  const day = dateValue?.day || '';
  const month = dateValue?.month || '';
  const year = dateValue?.year || '';

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <Text style={[styles.title, isOpen && styles.titleOpen]}>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#7A7A7A"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.body}>
          <View style={styles.dateRow}>
            <TextInput
              style={styles.dateInput}
              value={day}
              onChangeText={(v) => onDateChange('day', v.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="GG"
              placeholderTextColor="#7A7A7A"
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
              style={styles.dateInput}
              value={month}
              onChangeText={(v) => onDateChange('month', v.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="AA"
              placeholderTextColor="#7A7A7A"
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
              style={[styles.dateInput, styles.yearInput]}
              value={year}
              onChangeText={(v) => onDateChange('year', v.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="YYYY"
              placeholderTextColor="#7A7A7A"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  containerOpen: {
    borderWidth: 1.5,
    borderColor: '#C066A0',
    backgroundColor: '#FDF6F0',
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInput: {
    width: 70,
    height: 48,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    color: '#3D3D3D',
  },
  yearInput: {
    width: 100,
  },
  separator: {
    fontSize: 20,
    color: '#7A7A7A',
    marginHorizontal: 8,
  },
});
