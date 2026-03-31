import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { getWeekData } from '../../data/weekly/index';

export default function BabyDevelopmentScreen({ route }) {
  const currentWeek = route?.params?.currentWeek || 1;
  const weekData = getWeekData(currentWeek);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{currentWeek}. Hafta</Text>
      <Text style={styles.title}>Bebekte Neler Oluyor?</Text>

      <View style={[styles.statsCard, { backgroundColor: weekData.backgroundColors.primary }]}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{weekData.babySize}</Text>
          <Text style={styles.statLabel}>Boyut</Text>
        </View>
        {weekData.babyLength && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weekData.babyLength}</Text>
            <Text style={styles.statLabel}>Boy</Text>
          </View>
        )}
        {weekData.babyWeight && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weekData.babyWeight}</Text>
            <Text style={styles.statLabel}>Ağırlık</Text>
          </View>
        )}
      </View>

      <Text style={styles.content}>{weekData.whatHappensToBaby}</Text>
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
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.metin,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.metinAcik,
    marginTop: 4,
  },
  content: {
    fontSize: 16,
    color: COLORS.metin,
    lineHeight: 24,
  },
});
