import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import AccordionItem from '../../components/auth/AccordionItem';
import PrimaryButton from '../../components/common/PrimaryButton';

const METHODS = [
  'Son adet tarihine göre',
  'Gebe kalma tarihine göre',
  'Ultrason tarihine göre',
  'Embriyo transferi tarihine göre',
  'Tahmini doğum tarihini biliyorum',
];

export default function DateMethodScreen({ navigation }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [dates, setDates] = useState({});

  const toggleAccordion = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {METHODS.map((title, i) => (
          <AccordionItem
            key={i}
            title={title}
            isOpen={openIndex === i}
            onToggle={() => toggleAccordion(i)}
            dateValue={dates[i] || ''}
            onDateChange={(v) => setDates((prev) => ({ ...prev, [i]: v }))}
          />
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => navigation.navigate('Placeholder13')}
          disabled={openIndex === null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1 },
  contentInner: { paddingHorizontal: 20, paddingTop: 24 },
  bottom: { paddingBottom: 24 },
});
