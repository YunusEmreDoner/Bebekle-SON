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
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../../../components/common/PrimaryButton';
import { COLORS } from '../../../theme/colors';
import { signUp } from '../../../api/authService';
import { markOnboardingComplete } from '../../../api/profileService';
import { createPregnancyBaby } from '../../../api/babyService';
import { OnboardingContext } from '../context/OnboardingContext';
import { useOnboardingData } from '../context/OnboardingDataContext';

export default function SignUpScreen({ navigation }) {
  const completeOnboarding = useContext(OnboardingContext);
  const { displayName, role, journeyStage, pregnancyDueDate, reset } = useOnboardingData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const e = email.trim();
    if (!e || password.length < 6) {
      Alert.alert('Geçersiz', 'E-posta girin; şifre en az 6 karakter olmalı.');
      return;
    }
    const name = (displayName || '').trim();
    if (!name) {
      Alert.alert('Eksik', 'Profil akışında isim adımını tamamlayın.');
      return;
    }
    if (!role || !journeyStage) {
      Alert.alert('Eksik', 'Rol ve evre seçimlerini tamamlayın (akışı baştan geçin).');
      return;
    }
    if (journeyStage === 'pregnancy' && !pregnancyDueDate) {
      Alert.alert('Eksik', 'Tahmini doğum tarihi adımını tamamlayın.');
      return;
    }

    setLoading(true);
    const meta = {
      display_name: name,
      role,
      journey_stage: journeyStage,
      ...(journeyStage === 'pregnancy' && pregnancyDueDate
        ? { pregnancy_due_date: pregnancyDueDate }
        : {}),
    };
    const { data, error } = await signUp(e, password, {
      data: meta,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Kayıt başarısız', error.message ?? 'Bir hata oluştu');
      return;
    }

    if (data.session?.user) {
      if (journeyStage === 'pregnancy' && pregnancyDueDate) {
        const { error: babyError } = await createPregnancyBaby(data.session.user.id, pregnancyDueDate);
        if (babyError) {
          Alert.alert('Kayıt', babyError.message ?? 'Bebek kaydı oluşturulamadı. Profilden tekrar deneyin.');
          return;
        }
      }
      await markOnboardingComplete(data.session.user.id);
      reset();
      completeOnboarding();
      return;
    }

    Alert.alert(
      'E-posta doğrulama',
      'Hesabınız oluşturuldu. Gelen kutunuzdaki bağlantıyı onayladıktan sonra giriş yapabilirsiniz.',
      [{ text: 'Tamam', onPress: () => navigation.navigate('Login') }]
    );
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

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <Text style={styles.title}>Hesap oluştur</Text>
          <Text style={styles.subtitle}>
            Seçimleriniz kayıt ile hesabınıza bağlanacak.
          </Text>

          <View style={styles.summary}>
            <Text style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>İsim: </Text>
              {displayName.trim() || '—'}
            </Text>
            <Text style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Rol: </Text>
              {role || '—'}
            </Text>
            <Text style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Evre: </Text>
              {journeyStage || '—'}
            </Text>
            {journeyStage === 'pregnancy' && pregnancyDueDate ? (
              <Text style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Tahmini doğum: </Text>
                {pregnancyDueDate}
              </Text>
            ) : null}
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
            placeholder="Şifre (en az 6 karakter)"
            placeholderTextColor={COLORS.metinAcik}
            secureTextEntry
          />
        </ScrollView>

        <View style={styles.bottom}>
          {loading ? (
            <ActivityIndicator color={COLORS.mor} />
          ) : (
            <PrimaryButton title="Kayıt ol ve devam et" onPress={onSubmit} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.krem },
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 4 },
  scroll: { paddingHorizontal: 24, paddingBottom: 16 },
  title: { fontSize: 26, fontWeight: '600', color: COLORS.metin, marginTop: 8 },
  subtitle: { fontSize: 14, color: COLORS.metinAcik, marginTop: 8, marginBottom: 20 },
  summary: {
    backgroundColor: COLORS.beyaz,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 20,
    gap: 6,
  },
  summaryLine: { fontSize: 14, color: COLORS.metin },
  summaryLabel: { fontWeight: '600', color: COLORS.koyuMor },
  input: {
    height: 52,
    backgroundColor: COLORS.beyaz,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.metin,
    marginBottom: 12,
  },
  bottom: { paddingHorizontal: 24, paddingBottom: 32 },
});
