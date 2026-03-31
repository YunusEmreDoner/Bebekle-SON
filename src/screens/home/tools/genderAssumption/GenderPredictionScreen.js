import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../theme/colors';
import { GENDER_ASSUMPTION_METHODS } from '../../../../data/tools/genderAssumption';

const HUB_FALLBACK_TITLE = {
  chinese: 'Çin takvimi',
  mayan: 'Mayan',
  ring: 'Yüzük testi',
  turkish: 'Yöresel (TR)',
  japanese: 'Japon',
  indian: 'Hint',
};

function listTitle(method) {
  return method.title?.trim() || HUB_FALLBACK_TITLE[method.id] || method.id;
}

export default function GenderPredictionScreen({ navigation }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
      <Text style={styles.lead}>Bir yöntem seçerek devam et.</Text>
      <View style={styles.grid}>
        {GENDER_ASSUMPTION_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('GenderAssumptionDetail', { methodId: method.id })
            }
          >
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>{method.emoji}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {listTitle(method)}
              </Text>
              {!!method.subtitle?.trim() && (
                <Text style={styles.cardSub} numberOfLines={2}>
                  {method.subtitle}
                </Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.metinAcik} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.acikGri,
  },
  scrollInner: {
    padding: 16,
    paddingBottom: 32,
  },
  lead: {
    fontSize: 14,
    color: COLORS.metinAcik,
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  grid: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.beyaz,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.krem,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 22,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.metin,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.metinAcik,
    marginTop: 2,
  },
});
