import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../components/common/CustomHeader';
import { COLORS } from '../../theme/colors';

const SECTIONS = [
  { id: 'OnedioContent', label: 'Onedio-like Content' },
  { id: 'News', label: 'News' },
  { id: 'Articles', label: 'Articles' },
  { id: 'DocProComments', label: 'Doc Pro Comments' },
  { id: 'FloTips', label: 'Flo-like Tips' },
];

export default function InsightsHomeScreen({ navigation }) {
  return (
    <>
      <CustomHeader
        title="Insights"
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
            <Ionicons name="bookmark-outline" size={24} color={COLORS.metin} />
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.container}>
        {SECTIONS.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.sectionCard}
            onPress={() => navigation.navigate(section.id)}
          >
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.metinAcik} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.acikGri,
    padding: 16,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.beyaz,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionLabel: {
    fontSize: 16,
    color: COLORS.metin,
    fontWeight: '500',
  },
});
