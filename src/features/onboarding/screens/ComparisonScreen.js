import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../../components/common/PrimaryButton';

export default function ComparisonScreen({ navigation }) {
  const [front, setFront] = useState('bizimle');

  const bizsizIsFront = front === 'bizsiz';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.title}>Farkı görün</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.cardsArea}>
          <TouchableOpacity
            style={[
              styles.cardBase,
              styles.bizsizCard,
              {
                zIndex: bizsizIsFront ? 2 : 1,
                width: bizsizIsFront ? '85%' : '82%',
                height: bizsizIsFront ? 280 : 260,
                left: 10,
                bottom: 0,
              },
            ]}
            onPress={() => setFront('bizsiz')}
            activeOpacity={0.9}
          >
            <Text style={styles.bizsizTitle}>Bizsiz</Text>
            <View style={styles.itemRow}>
              <Ionicons name="close-circle" size={18} color="#C066A0" />
              <Text style={styles.bizsizLine}>Bilgiye ulaşmak zor</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="close-circle" size={18} color="#C066A0" />
              <Text style={styles.bizsizLine}>Sorularınız yanıtsız kalır</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="close-circle" size={18} color="#C066A0" />
              <Text style={styles.bizsizLine}>Gelişimi takip edemezsiniz</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="close-circle" size={18} color="#C066A0" />
              <Text style={styles.bizsizLine}>Yalnız hissedersiniz</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardBase,
              styles.bizimleCard,
              {
                zIndex: bizsizIsFront ? 1 : 2,
                width: bizsizIsFront ? '82%' : '85%',
                height: bizsizIsFront ? 260 : 280,
                right: 0,
                top: 0,
              },
            ]}
            onPress={() => setFront('bizimle')}
            activeOpacity={0.9}
          >
            <Text style={styles.bizimleTitle}>Bizimle</Text>
            <View style={styles.itemRow}>
              <Ionicons name="checkmark-circle" size={18} color="#D4C5F0" />
              <Text style={styles.bizimleText}>Uzman onaylı bilgiler</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="checkmark-circle" size={18} color="#D4C5F0" />
              <Text style={styles.bizimleText}>7/24 AI asistan desteği</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="checkmark-circle" size={18} color="#D4C5F0" />
              <Text style={styles.bizimleText}>Haftalık gelişim takibi</Text>
            </View>
            <View style={styles.itemRow}>
              <Ionicons name="checkmark-circle" size={18} color="#D4C5F0" />
              <Text style={styles.bizimleText}>Güçlü anne topluluğu</Text>
            </View>
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
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  top: {
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  cardsArea: {
    height: 380,
    position: 'relative',
  },
  cardBase: {
    position: 'absolute',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
  },
  bizsizCard: {
    backgroundColor: '#E8E0E5',
  },
  bizimleCard: {
    backgroundColor: '#7C5CBF',
    shadowColor: '#7C5CBF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  bizsizTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7A7A7A',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  bizsizLine: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  bizimleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  bizimleText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottom: { marginBottom: 40 },
});
