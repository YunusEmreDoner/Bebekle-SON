import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const handleDateChange = (index, field, value) => {
    setDates((prev) => ({
      ...prev,
      [index]: { ...(prev[index] || {}), [field]: value },
    }));
  };

  const currentDate = openIndex !== null ? dates[openIndex] : null;
  const isDateComplete =
    currentDate &&
    currentDate.day?.length === 2 &&
    currentDate.month?.length === 2 &&
    currentDate.year?.length === 4;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.title}>Bebeğinizin doğum tarihini hesaplayalım</Text>
        <Text style={styles.subtitle}>Aşağıdaki yöntemlerden birini seçin</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        {METHODS.map((title, i) => (
          <AccordionItem
            key={i}
            title={title}
            isOpen={openIndex === i}
            onToggle={() => toggleAccordion(i)}
            dateValue={dates[i] || {}}
            onDateChange={(field, value) => handleDateChange(i, field, value)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => navigation.navigate('Placeholder13')}
          disabled={!isDateComplete}
        />
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
    fontSize: 22,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 8,
  },
  scroll: { flex: 1 },
  scrollInner: { paddingHorizontal: 20 },
  bottom: { marginBottom: 40 },
});
