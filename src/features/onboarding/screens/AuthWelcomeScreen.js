import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../../../components/common/PrimaryButton';
import { COLORS } from '../../../theme/colors';
import { useOnboardingData } from '../context/OnboardingDataContext';

export default function AuthWelcomeScreen({ navigation }) {
  const { reset } = useOnboardingData();

  const goNewUser = () => {
    reset();
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding1' }] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.logo}>Bebekle</Text>
        <Text style={styles.tagline}>Hamilelik ve bebek yolculuğunda yanınızda</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Giriş yap" onPress={() => navigation.navigate('Login')} />
        <TouchableOpacity style={styles.secondary} onPress={goNewUser} activeOpacity={0.7}>
          <Text style={styles.secondaryTitle}>Yeni kullanıcıyım</Text>
          <Text style={styles.secondarySub}>I’m new — profil oluştur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.krem },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  logo: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.koyuMor,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    color: COLORS.metinAcik,
    textAlign: 'center',
    marginTop: 12,
  },
  actions: { paddingHorizontal: 24, paddingBottom: 40, gap: 14 },
  secondary: {
    borderWidth: 1.5,
    borderColor: COLORS.mor,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLORS.beyaz,
  },
  secondaryTitle: { fontSize: 17, fontWeight: '600', color: COLORS.mor },
  secondarySub: { fontSize: 13, color: COLORS.metinAcik, marginTop: 4 },
});
