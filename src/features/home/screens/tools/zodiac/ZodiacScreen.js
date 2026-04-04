import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../../../theme/colors';
import { getDailyZodiacPayload, MOCK_MOTHER_BIRTH } from '../../../../../domain/tools/zodiac/dailyZodiac';

function FieldCard({ label, value }) {
  if (!value?.trim?.()) return null;
  return (
    <View style={styles.fieldCard}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export default function ZodiacScreen() {
  const { sign, content } = useMemo(
    () => getDailyZodiacPayload(MOCK_MOTHER_BIRTH),
    []
  );

  const hasHighlights = [
    content.love,
    content.mood,
    content.careTip,
    content.luckyNumber,
    content.luckyColor,
  ].some((v) => v?.trim?.());

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.inner}>
      <Text style={styles.sectionEyebrow}>Bugünün yorumu</Text>
      <Text style={styles.dateLine}>
        Annenin burcu:{' '}
        <Text style={styles.dateStrong}>{sign.label}</Text>
        {' · '}
        {sign.dateRange}
      </Text>
      <Text style={styles.hint}>
        Burç, doğum tarihinden hesaplanır (şimdilik örnek:{' '}
        <Text style={styles.mono}>
          {MOCK_MOTHER_BIRTH.month}/{MOCK_MOTHER_BIRTH.day}
        </Text>
        ).
      </Text>

      <LinearGradient
        colors={[COLORS.lavanda, COLORS.pudraPembesi]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroSign}>{sign.label}</Text>
        <Text style={styles.heroTitle}>
          {content.headline?.trim() || 'Günlük başlık'}
        </Text>
      </LinearGradient>

      <Text style={styles.mainText}>
        {content.mainText?.trim() || 'Ana yorum metni burada yer alacak.'}
      </Text>

      {hasHighlights && (
        <>
          <Text style={styles.subHead}>Öne çıkanlar</Text>
          <View style={styles.grid}>
            <FieldCard label="Aşk / ilişki" value={content.love} />
            <FieldCard label="Ruh hali" value={content.mood} />
            <FieldCard label="Öneri" value={content.careTip} />
            <FieldCard label="Şanslı sayı" value={content.luckyNumber} />
            <FieldCard label="Şanslı renk" value={content.luckyColor} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  inner: {
    padding: 20,
    paddingBottom: 36,
  },
  sectionEyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.metinAcik,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  dateLine: {
    fontSize: 14,
    color: COLORS.metin,
    lineHeight: 20,
    marginBottom: 8,
  },
  dateStrong: {
    fontWeight: '700',
    color: COLORS.koyuMor,
  },
  hint: {
    fontSize: 12,
    color: COLORS.metinAcik,
    lineHeight: 18,
    marginBottom: 18,
  },
  mono: {
    fontFamily: 'System',
    fontWeight: '600',
  },
  hero: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  heroSign: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.koyuMor,
    opacity: 0.9,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.metin,
    lineHeight: 28,
  },
  mainText: {
    fontSize: 16,
    color: COLORS.metin,
    lineHeight: 25,
    marginBottom: 24,
  },
  subHead: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 10,
  },
  grid: {
    gap: 10,
  },
  fieldCard: {
    backgroundColor: COLORS.krem,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.metinAcik,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 15,
    color: COLORS.metin,
    lineHeight: 22,
  },
});
