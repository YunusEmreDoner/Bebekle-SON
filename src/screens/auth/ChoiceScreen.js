import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';

const CHOICES = ['Seçenek A', 'Seçenek B'];

export default function ChoiceScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {CHOICES.map((label, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, selected === i && styles.cardSelected]}
            onPress={() => setSelected(i)}
            activeOpacity={0.7}
          >
            <Text style={[styles.cardText, selected === i && styles.cardTextSelected]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => navigation.navigate('Placeholder8')}
          disabled={selected === null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, gap: 16 },
  card: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: '#C066A0',
    backgroundColor: '#FDF6F0',
  },
  cardText: { fontSize: 16, fontWeight: '600', color: '#7A7A7A' },
  cardTextSelected: { color: '#C066A0' },
  bottom: { paddingBottom: 24 },
});
