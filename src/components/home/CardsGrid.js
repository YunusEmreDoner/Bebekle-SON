import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';

const CARDS = [
  { id: 'QuizCard', label: 'Quiz Cards', icon: '🧠' },
  { id: 'InfoCard', label: 'Info Cards', icon: '📖' },
  { id: 'VideoList', label: 'Recommended Videos', icon: '🎬' },
  { id: 'DailyNews', label: 'Daily News', icon: '📰' },
];

export default function CardsGrid({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cards</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {CARDS.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => navigation.navigate(card.id)}
          >
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: COLORS.beyaz,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.metin,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 12,
  },
  card: {
    width: 120,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.lavanda,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    padding: 12,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    color: COLORS.metin,
    textAlign: 'center',
    fontWeight: '500',
  },
});
