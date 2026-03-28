import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../components/common/PrimaryButton';

const OPTIONS = ['Seçenek 1', 'Seçenek 2', 'Seçenek 3', 'Seçenek 4'];

export default function GoalSelectionScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#3D3D3D" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Soru alanı</Text>
        </View>

        <View style={styles.grid}>
          {OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.option, selected === i && styles.optionSelected]}
              onPress={() => setSelected(i)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, selected === i && styles.optionTextSelected]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Ortak hesap ile devam et</Text>
        </TouchableOpacity>
        <PrimaryButton
          title="İlerle"
          onPress={() => navigation.navigate('Placeholder6')}
          disabled={selected === null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    height: 48,
    alignItems: 'center',
  },
  content: { flex: 1, paddingHorizontal: 20 },
  questionBox: {
    height: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 16,
  },
  questionText: { fontSize: 14, color: '#7A7A7A' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  option: {
    width: '47%',
    height: 100,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    borderColor: '#C066A0',
    backgroundColor: '#FDF6F0',
  },
  optionText: { fontSize: 14, fontWeight: '600', color: '#7A7A7A' },
  optionTextSelected: { color: '#C066A0' },
  bottom: { paddingBottom: 24, gap: 12 },
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
