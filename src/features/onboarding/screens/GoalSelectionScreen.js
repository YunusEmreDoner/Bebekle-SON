import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useOnboardingData } from '../context/OnboardingDataContext';

const ROLE_KEYS = ['mother', 'father', 'caregiver', 'other'];

const OPTIONS = [
  { label: 'Anne', icon: 'woman-outline', iconColor: '#C066A0', iconBg: '#F2C4CE' },
  { label: 'Baba', icon: 'man-outline', iconColor: '#9B5CC4', iconBg: '#D4C5F0' },
  { label: 'Dadı / Bakıcı', icon: 'people-outline', iconColor: '#C066A0', iconBg: '#F2C4CE' },
  { label: 'Diğer', icon: 'ellipsis-horizontal-circle-outline', iconColor: '#9B5CC4', iconBg: '#D4C5F0' },
];

export default function GoalSelectionScreen({ navigation }) {
  const { setRole } = useOnboardingData();
  const [selected, setSelected] = useState(null);
  const [otherText, setOtherText] = useState('');

  const isOther = selected === 3;
  const canProceed = selected !== null && (!isOther || otherText.trim().length > 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#7A7A7A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Siz kimsiniz?</Text>
        <Text style={styles.subtitle}>Size en uygun deneyimi sunabilmemiz için</Text>

        <View style={styles.grid}>
          {OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.option, selected === i && styles.optionSelected]}
              onPress={() => setSelected(i)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: opt.iconBg }]}>
                <Ionicons name={opt.icon} size={36} color={opt.iconColor} />
              </View>
              <Text style={[styles.optionText, selected === i && styles.optionTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isOther && (
          <TextInput
            style={styles.otherInput}
            value={otherText}
            onChangeText={setOtherText}
            placeholder="Lütfen belirtin..."
            placeholderTextColor="#7A7A7A"
          />
        )}
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Ortak hesap ile devam et</Text>
        </TouchableOpacity>
        <PrimaryButton
          title="İlerle"
          onPress={() => {
            if (selected !== null) setRole(ROLE_KEYS[selected]);
            navigation.navigate('Placeholder6');
          }}
          disabled={!canProceed}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    height: 48,
    alignItems: 'center',
  },
  content: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  option: {
    width: '44%',
    height: 130,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#C066A0',
    backgroundColor: '#FDF6F0',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionText: { fontSize: 14, fontWeight: '600', color: '#3D3D3D' },
  optionTextSelected: { color: '#C066A0' },
  otherInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#3D3D3D',
    marginTop: 16,
  },
  bottom: { marginBottom: 40, gap: 12 },
  secondaryBtn: {
    width: '90%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C066A0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  secondaryText: { fontSize: 16, fontWeight: '600', color: '#C066A0' },
});
