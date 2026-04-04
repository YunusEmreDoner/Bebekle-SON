import React, { useLayoutEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { COLORS } from '../../../../../theme/colors';
import { getGenderAssumptionById } from '../../../../../domain/tools/genderAssumption';

const HUB_FALLBACK_TITLE = {
  chinese: 'Çin takvimi',
  mayan: 'Mayan',
  ring: 'Yüzük testi',
  turkish: 'Yöresel (TR)',
  japanese: 'Japon',
  indian: 'Hint',
};

export default function GenderAssumptionDetailScreen({ route, navigation }) {
  const methodId = route?.params?.methodId;
  const data = useMemo(() => getGenderAssumptionById(methodId), [methodId]);

  useLayoutEffect(() => {
    const title =
      data?.title?.trim() ||
      HUB_FALLBACK_TITLE[methodId] ||
      'Cinsiyet tahmini';
    navigation.setOptions({ title });
  }, [navigation, data, methodId]);

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.missing}>Yöntem bulunamadı.</Text>
      </View>
    );
  }

  const imageSource =
    data.heroUri != null
      ? typeof data.heroUri === 'string'
        ? { uri: data.heroUri }
        : data.heroUri
      : null;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.inner}>
      <View style={styles.heroWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.heroImg} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroEmoji}>{data.emoji}</Text>
          </View>
        )}
      </View>

      {!!data.subtitle?.trim() && (
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      )}

      {!!data.body?.trim() && <Text style={styles.body}>{data.body}</Text>}

      {Array.isArray(data.bullets) && data.bullets.some((b) => b?.trim?.()) && (
        <View style={styles.bulletBlock}>
          {data.bullets
            .filter((b) => b?.trim?.())
            .map((line, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            ))}
        </View>
      )}

      {!!data.disclaimer?.trim() && (
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimer}>{data.disclaimer}</Text>
        </View>
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
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.beyaz,
  },
  missing: {
    color: COLORS.metinAcik,
  },
  heroWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.acikGri,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  heroEmoji: {
    fontSize: 56,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.mor,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  body: {
    fontSize: 16,
    color: COLORS.metin,
    lineHeight: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  bulletBlock: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    width: 20,
    fontSize: 16,
    color: COLORS.koyuMor,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.metin,
    lineHeight: 22,
  },
  disclaimerBox: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.krem,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.metinAcik,
    lineHeight: 18,
  },
});
