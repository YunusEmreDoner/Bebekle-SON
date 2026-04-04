import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { getDayData } from '../../../../domain/pregnancy/content/daily/index';

export default function DailyTipScreen({ route }) {
  const currentDay = route?.params?.currentDay || 1;
  const dayData = getDayData(currentDay);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{dayData.week}. Hafta — {dayData.day}. Gün</Text>
      <Text style={styles.title}>Günün İpucu</Text>
      <Text style={styles.content}>{dayData.tip}</Text>
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
