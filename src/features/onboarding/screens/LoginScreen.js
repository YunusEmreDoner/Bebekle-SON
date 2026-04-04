import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../../../components/common/PrimaryButton';
import { COLORS } from '../../../theme/colors';
import { signIn } from '../../../api/authService';
import { ensurePregnancyBabyFromMetadata } from '../../../api/babyService';
import { OnboardingContext } from '../context/OnboardingContext';
import { useOnboardingData } from '../context/OnboardingDataContext';

export default function LoginScreen({ navigation }) {
  const completeOnboarding = useContext(OnboardingContext);
  const { reset } = useOnboardingData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const e = email.trim();
    if (!e || !password) {
      Alert.alert('Eksik bilgi', 'E-posta ve şifre girin.');
      return;
    }
    setLoading(true);
    const { data, error } = await signIn(e, password);
    setLoading(false);
    if (error) {
      Alert.alert('Giriş başarısız', error.message ?? 'Bir hata oluştu');
      return;
    }
    if (data.session) {
      const { error: syncErr } = await ensurePregnancyBabyFromMetadata(data.session.user);
      if (syncErr) {
        Alert.alert('Senkronizasyon', syncErr.message ?? 'Profil verileri güncellenemedi.');
        return;
      }
      reset();
      completeOnboarding();
    } else {
      Alert.alert('Oturum', 'Oturum açılamadı. E-posta doğrulaması gerekebilir.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={26} color={COLORS.metinAcik} />
          </TouchableOpacity>
        </View>

        <View style={styles.top}>
          <Text style={styles.title}>Giriş yap</Text>
          <Text style={styles.subtitle}>E-posta ve şifrenle devam et</Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-posta"
          placeholderTextColor={COLORS.metinAcik}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Şifre"
          placeholderTextColor={COLORS.metinAcik}
          secureTextEntry
        />

        <View style={styles.spacer} />

        <View style={styles.bottom}>
          {loading ? (
            <ActivityIndicator color={COLORS.mor} />
          ) : (
            <PrimaryButton title="Giriş yap" onPress={onSubmit} />
          )}
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              reset();
              navigation.reset({ index: 0, routes: [{ name: 'Onboarding1' }] });
            }}
          >
            <Text style={styles.linkText}>Hesabın yok mu? Kayıt ol</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.krem },
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 4 },
  top: { paddingHorizontal: 24, marginTop: 16, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '600', color: COLORS.metin },
  subtitle: { fontSize: 15, color: COLORS.metinAcik, marginTop: 8 },
  input: {
    height: 52,
    backgroundColor: COLORS.beyaz,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.metin,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  spacer: { flex: 1 },
  bottom: { paddingHorizontal: 24, paddingBottom: 32, gap: 12 },
  link: { alignItems: 'center', paddingVertical: 8 },
  linkText: { fontSize: 15, fontWeight: '600', color: COLORS.mor },
});
