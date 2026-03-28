import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function ComparisonScreen({ navigation }) {
  const [front, setFront] = useState('bizimle');

  const bizsizIsFront = front === 'bizsiz';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.cardsArea}>
          <TouchableOpacity
            style={[
              styles.cardBase,
              styles.bizsizCard,
              {
                zIndex: bizsizIsFront ? 2 : 1,
                width: bizsizIsFront ? '80%' : '75%',
                height: bizsizIsFront ? 220 : 200,
                left: 0,
                bottom: 0,
              },
            ]}
            onPress={() => setFront('bizsiz')}
            activeOpacity={0.9}
          >
            <Text style={styles.bizsizTitle}>Bizsiz</Text>
            <Text style={styles.bizsizLine}>Placeholder metin satir 1</Text>
            <Text style={styles.bizsizLine}>Placeholder metin satir 2</Text>
            <Text style={styles.bizsizLine}>Placeholder metin satir 3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardBase,
              styles.bizimleCard,
              {
                zIndex: bizsizIsFront ? 1 : 2,
                width: bizsizIsFront ? '75%' : '80%',
                height: bizsizIsFront ? 200 : 220,
                right: 0,
                top: 0,
              },
            ]}
            onPress={() => setFront('bizimle')}
            activeOpacity={0.9}
          >
            <Text style={styles.bizimleTitle}>Bizimle</Text>
            <Text style={styles.bizimleText}>Placeholder metin satir 1</Text>
            <Text style={styles.bizimleText}>Placeholder metin satir 2</Text>
            <Text style={styles.bizimleText}>Placeholder metin satir 3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Paywall')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  cardsArea: {
    height: 320,
    position: 'relative',
  },
  cardBase: {
    position: 'absolute',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
  },
  bizsizCard: {
    backgroundColor: '#E0E0E0',
  },
  bizimleCard: {
    backgroundColor: '#7C5CBF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  bizsizTitle: { fontSize: 20, fontWeight: '700', color: '#3D3D3D', marginBottom: 12 },
  bizsizLine: { fontSize: 14, color: '#5A5A5A', marginBottom: 4 },
  bizimleTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  bizimleText: { fontSize: 14, color: '#F0E8FF', marginBottom: 4 },
  bottom: { paddingBottom: 24 },
});
