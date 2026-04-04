import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../theme/colors';

export default function ExperienceScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Experience</Text>
      <Text style={styles.subheading}>Durumunuzu seçin</Text>

      <TouchableOpacity
        style={[styles.card, selected === 'pregnant' && styles.cardSelected]}
        onPress={() => setSelected('pregnant')}
      >
        <Ionicons
          name="woman-outline"
          size={48}
          color={selected === 'pregnant' ? COLORS.mor : COLORS.metinAcik}
        />
        <Text style={[styles.cardTitle, selected === 'pregnant' && styles.cardTitleSelected]}>
          I am pregnant
        </Text>
        <Text style={styles.cardDesc}>Hamilelik sürecinizi takip edin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, selected === 'baby' && styles.cardSelected]}
        onPress={() => setSelected('baby')}
      >
        <Ionicons
          name="happy-outline"
          size={48}
          color={selected === 'baby' ? COLORS.mor : COLORS.metinAcik}
        />
        <Text style={[styles.cardTitle, selected === 'baby' && styles.cardTitleSelected]}>
          I have a baby
        </Text>
        <Text style={styles.cardDesc}>Bebeğinizin gelişimini takip edin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.metinAcik,
    marginBottom: 24,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.acikGri,
    marginBottom: 16,
  },
  cardSelected: {
    borderColor: COLORS.mor,
    backgroundColor: '#F9F0F7',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.metin,
    marginTop: 12,
  },
  cardTitleSelected: {
    color: COLORS.mor,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.metinAcik,
    marginTop: 4,
  },
});
