import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../components/common/PrimaryButton';

const FEATURES = [
  {
    iconBg: '#F2C4CE',
    icon: 'calendar-outline',
    iconColor: '#C066A0',
    title: 'Haftalık gelişim takibi',
    subtitle: 'Bebeğinizin büyümesini izleyin',
  },
  {
    iconBg: '#D4C5F0',
    icon: 'chatbubble-ellipses-outline',
    iconColor: '#9B5CC4',
    title: 'AI Asistan',
    subtitle: '7/24 sorularınızı yanıtlar',
  },
  {
    iconBg: '#F2C4CE',
    icon: 'medkit-outline',
    iconColor: '#C066A0',
    title: 'Uzman desteği',
    subtitle: 'Pedagog ile birebir görüşme',
  },
  {
    iconBg: '#D4C5F0',
    icon: 'people-outline',
    iconColor: '#9B5CC4',
    title: 'Topluluk',
    subtitle: 'Diğer annelerle paylaşım',
  },
];

export default function FeaturesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.titleBar} />
        <View style={styles.subtitleBar} />

        <View style={styles.list}>
          {FEATURES.map((feat, i) => (
            <View key={i} style={styles.featureCard}>
              <View style={[styles.iconCircle, { backgroundColor: feat.iconBg }]}>
                <Ionicons name={feat.icon} size={22} color={feat.iconColor} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.featureTitle}>{feat.title}</Text>
                <Text style={styles.featureSub}>{feat.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.bottom}>
        <PrimaryButton title="Başlayalım" onPress={() => navigation.navigate('Placeholder11')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  titleBar: {
    height: 30,
    width: '60%',
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    alignSelf: 'center',
  },
  subtitleBar: {
    height: 20,
    width: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  list: { gap: 12 },
  featureCard: {
    height: 72,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textCol: { flex: 1 },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3D3D3D',
  },
  featureSub: {
    fontSize: 13,
    color: '#7A7A7A',
    marginTop: 2,
  },
  bottom: { marginBottom: 40 },
});
