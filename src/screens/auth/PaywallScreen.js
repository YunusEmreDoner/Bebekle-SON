import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/common/PrimaryButton';
import { OnboardingContext } from '../../context/OnboardingContext';

export default function PaywallScreen() {
  const completeOnboarding = useContext(OnboardingContext);
  const [plan, setPlan] = useState('yearly');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Bu yolculukta yalnız değilsin</Text>
        <Text style={styles.subtitle}>Placeholder alt başlık metni burada yer alacak</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>7 gün ücretsiz dene, istersen iptal et</Text>
        </View>

        <TouchableOpacity
          style={[styles.planCard, plan === 'monthly' && styles.planSelected]}
          onPress={() => setPlan('monthly')}
          activeOpacity={0.7}
        >
          <View style={styles.planLeft}>
            <Text style={styles.planTitle}>Aylık Plan</Text>
            <Text style={styles.planSub}>İstediğin zaman iptal et</Text>
          </View>
          <Text style={styles.planPrice}>₺149/ay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.planCard, plan === 'yearly' && styles.planSelected]}
          onPress={() => setPlan('yearly')}
          activeOpacity={0.7}
        >
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>%40 tasarruf</Text>
          </View>
          <View style={styles.planLeft}>
            <Text style={styles.planTitle}>Yıllık Plan</Text>
            <Text style={styles.planSub}>₺89/ay (₺1.068/yıl)</Text>
          </View>
          <Text style={styles.planPrice}>₺89/ay</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          7 günlük ücretsiz deneme sonrası ücretlendirilirsin
        </Text>
      </ScrollView>

      <View style={styles.bottom}>
        <PrimaryButton title="7 Gün Ücretsiz Başla" onPress={completeOnboarding} />
        <TouchableOpacity style={styles.skipLink} onPress={completeOnboarding}>
          <Text style={styles.skipText}>Şimdilik geç</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  scroll: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 16, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#FDF6F0',
    borderWidth: 1,
    borderColor: '#C066A0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  badgeText: { fontSize: 13, fontWeight: '600', color: '#C066A0' },
  planCard: {
    width: '100%',
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
    position: 'relative',
    overflow: 'visible',
  },
  planSelected: {
    borderWidth: 2,
    borderColor: '#C066A0',
  },
  planLeft: { flex: 1 },
  planTitle: { fontSize: 16, fontWeight: '600', color: '#3D3D3D' },
  planSub: { fontSize: 13, color: '#7A7A7A', marginTop: 2 },
  planPrice: { fontSize: 16, fontWeight: '600', color: '#3D3D3D' },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: '#C066A0',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  discountText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  disclaimer: {
    fontSize: 11,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 4,
  },
  bottom: { marginBottom: 40, alignItems: 'center' },
  skipLink: { marginTop: 12 },
  skipText: { fontSize: 14, color: '#C066A0', fontWeight: '600' },
});
