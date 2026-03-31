import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { getWeekData } from '../../data/weekly/index';

export default function MyBodyScreen({ route }) {
  const currentWeek = route?.params?.currentWeek || 1;
  const weekData = getWeekData(currentWeek);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{currentWeek}. Hafta</Text>
      <Text style={styles.title}>Vücudum</Text>
      <Text style={styles.content}>{weekData.myBody}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: COLORS.beyaz,
  },
  label: {
    fontSize: 13,
    color: COLORS.metinAcik,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: COLORS.metin,
    lineHeight: 24,
  },
});
