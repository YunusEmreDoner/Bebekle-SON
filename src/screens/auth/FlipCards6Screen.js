import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import FlipCard from '../../components/auth/FlipCard';
import PrimaryButton from '../../components/common/PrimaryButton';

const CARD_COUNT = 6;

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
      <View style={styles.content}>
        <View style={styles.grid}>
          {Array.from({ length: CARD_COUNT }, (_, i) => (
            <FlipCard
              key={i}
              isFlipped={flippedIndex === i}
              isSelected={selectedSet.has(i)}
              onPress={() => handlePress(i)}
              style={styles.card}
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
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '47%',
    height: 120,
    marginBottom: 0,
  },
  bottom: { paddingBottom: 24 },
});
