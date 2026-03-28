import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';
import { OnboardingContext } from '../../navigation/RootNavigator';

export default function PaywallScreen() {
  const completeOnboarding = useContext(OnboardingContext);
  const [plan, setPlan] = useState('yearly');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Bu yolculukta yalniz degilsin</Text>
        <Text style={styles.subtitle}>Placeholder alt baslik metni burada yer alacak</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>7 gun ucretsiz dene, istersen iptal et</Text>
        </View>

        {/* Aylik Plan */}
        <TouchableOpacity
          style={[styles.planCard, plan === 'monthly' && styles.planSelected]}
          onPress={() => setPlan('monthly')}
          activeOpacity={0.7}
        >
          <View style={styles.planLeft}>
            <Text style={styles.planTitle}>Aylik Plan</Text>
            <Text style={styles.planSub}>Istedigin zaman iptal et</Text>
          </View>
          <Text style={styles.planPrice}>₺149/ay</Text>
        </TouchableOpacity>

        {/* Yillik Plan */}
        <TouchableOpacity
          style={[styles.planCard, plan === 'yearly' && styles.planSelected]}
          onPress={() => setPlan('yearly')}
          activeOpacity={0.7}
        >
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>%40 tasarruf</Text>
          </View>
          <View style={styles.planLeft}>
            <Text style={styles.planTitle}>Yillik Plan</Text>
            <Text style={styles.planSub}>₺89/ay (₺1.068/yil)</Text>
          </View>
          <Text style={styles.planPrice}>₺89/ay</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          7 gunluk ucretsiz deneme sonrasi ucretlendirilirsin
        </Text>
      </ScrollView>

      <View style={styles.bottom}>
        <PrimaryButton title="7 Gun Ucretsiz Basla" onPress={completeOnboarding} />
        <TouchableOpacity style={styles.skipLink} onPress={completeOnboarding}>
          <Text style={styles.skipText}>Simdilik gec</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 16, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0E5',
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
  planTitle: { fontSize: 16, fontWeight: '700', color: '#3D3D3D' },
  planSub: { fontSize: 13, color: '#7A7A7A', marginTop: 2 },
  planPrice: { fontSize: 16, fontWeight: '700', color: '#3D3D3D' },
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
  bottom: { paddingBottom: 24, alignItems: 'center' },
  skipLink: { marginTop: 12 },
  skipText: { fontSize: 14, color: '#C066A0', fontWeight: '600' },
});
