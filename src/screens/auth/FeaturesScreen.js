import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';

const FEATURES = [1, 2, 3, 4];

export default function FeaturesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.titleBar} />
        <View style={styles.subtitleBar} />

        <View style={styles.list}>
          {FEATURES.map((_, i) => (
            <View key={i} style={styles.featureCard}>
              <View style={styles.iconCircle} />
              <View style={styles.textCol}>
                <View style={styles.line1} />
                <View style={styles.line2} />
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
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
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
    borderWidth: 1,
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
    backgroundColor: '#E8E0E5',
    marginRight: 14,
  },
  textCol: { flex: 1, gap: 6 },
  line1: { height: 14, width: '70%', backgroundColor: '#E0E0E0', borderRadius: 4 },
  line2: { height: 10, width: '50%', backgroundColor: '#F0F0F0', borderRadius: 4 },
  bottom: { paddingBottom: 24 },
});
