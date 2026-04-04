import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlipCard from '../../../components/features/onboarding/FlipCard';
import PrimaryButton from '../../../components/common/PrimaryButton';

const LABELS = ['Hamilelik', 'Doğum', 'Emzirme', 'Bebek Bakımı', 'Anne Sağlığı', 'Beslenme'];

export default function FlipCards6Screen({ navigation }) {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [selectedSet, setSelectedSet] = useState(new Set());

  const handlePress = (i) => {
    const isFlipped = flippedIndex === i;
    const isSelected = selectedSet.has(i);

    if (isFlipped && isSelected) {
      setFlippedIndex(null);
      setSelectedSet((prev) => {
        const next = new Set(prev);
        next.delete(i);
        return next;
      });
    } else if (!isFlipped && isSelected) {
      setSelectedSet((prev) => {
        const next = new Set(prev);
        next.delete(i);
        return next;
      });
    } else {
      setFlippedIndex(i);
      setSelectedSet((prev) => new Set(prev).add(i));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.questionArea} />

      <View style={styles.content}>
        <View style={styles.grid}>
          {LABELS.map((label, i) => (
            <FlipCard
              key={i}
              isFlipped={flippedIndex === i}
              isSelected={selectedSet.has(i)}
              onPress={() => handlePress(i)}
              style={styles.card}
              backLabel={label}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Placeholder16')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  questionArea: {
    height: 60,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '44%',
    height: 120,
  },
  bottom: { marginBottom: 40 },
});
