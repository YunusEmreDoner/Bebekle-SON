import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';

const TABS = ['My Posts', 'Liked', 'Saved'];

export default function OtherTab() {
  const [activeSection, setActiveSection] = useState('My Posts');

  return (
    <View style={styles.container}>
      <View style={styles.segmentRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.segment, activeSection === tab && styles.activeSegment]}
            onPress={() => setActiveSection(tab)}
          >
            <Text style={[styles.segmentText, activeSection === tab && styles.activeSegmentText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>[{activeSection} listesi burada görünecek]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  segmentRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeSegment: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.mor,
  },
  segmentText: {
    fontSize: 13,
    color: COLORS.metinAcik,
  },
  activeSegmentText: {
    color: COLORS.mor,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: COLORS.metinAcik,
  },
});
