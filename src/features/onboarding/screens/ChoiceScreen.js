import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useOnboardingData } from '../context/OnboardingDataContext';

const CHOICES = [
  {
    icon: 'heart-circle-outline',
    iconColor: '#C066A0',
    iconBg: '#F2C4CE',
    title: 'Hamileyim',
    subtitle: 'Bebeğimi bekliyorum',
  },
  {
    icon: 'happy-outline',
    iconColor: '#9B5CC4',
    iconBg: '#D4C5F0',
    title: 'Doğum yaptım',
    subtitle: 'Bebeğim dünyaya geldi',
  },
];

export default function ChoiceScreen({ navigation }) {
  const { setJourneyStage } = useOnboardingData();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.title}>In what stage are you in?</Text>
        <Text style={styles.subtitle}>Deneyiminizi kişiselleştirmek için</Text>
      </View>

      <View style={styles.content}>
        {CHOICES.map((choice, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, selected === i && styles.cardSelected]}
            onPress={() => setSelected(i)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: choice.iconBg }]}>
              <Ionicons name={choice.icon} size={40} color={choice.iconColor} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.cardTitle}>{choice.title}</Text>
              <Text style={styles.cardSubtitle}>{choice.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => {
            if (selected === 0) setJourneyStage('pregnancy');
            if (selected === 1) setJourneyStage('born');
            navigation.navigate('Placeholder8');
          }}
          disabled={selected === null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  top: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    height: 90,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#C066A0',
    backgroundColor: '#FDF6F0',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7A7A7A',
    marginTop: 2,
  },
  bottom: { marginBottom: 40 },
});
