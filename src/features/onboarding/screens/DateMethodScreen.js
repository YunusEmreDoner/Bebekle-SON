import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useOnboardingData } from '../context/OnboardingDataContext';
import { formatShortDate } from '../../../utils/dateFormatting';
import {
  clampDueDateToPregnancyBounds,
  getPregnancyDueDateMaximumDate,
  getPregnancyDueDateMinimumDate,
  toLocalYmd,
  parseYmdToLocalDate,
} from '../../../utils/pregnancyDueDateBounds';

const COMING_SOON_METHODS = [
  'Son adet tarihine göre',
  'Gebe kalma tarihine göre',
  'Ultrason tarihine göre',
  'Embriyo transferi tarihine göre',
];

const APPROX_TITLE = 'Tahmini doğum tarihimi yaklaşık olarak biliyorum';

export default function DateMethodScreen({ navigation }) {
  const { journeyStage, pregnancyDueDate, setPregnancyDueDate } = useOnboardingData();
  const minDate = useMemo(() => getPregnancyDueDateMinimumDate(), []);
  const maxDate = useMemo(() => getPregnancyDueDateMaximumDate(), []);

  const [pickerDate, setPickerDate] = useState(() => {
    if (pregnancyDueDate) {
      return clampDueDateToPregnancyBounds(parseYmdToLocalDate(pregnancyDueDate), minDate, maxDate);
    }
    const d = new Date(minDate);
    d.setDate(d.getDate() + 140);
    return clampDueDateToPregnancyBounds(d, minDate, maxDate);
  });

  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(null);

  const isPregnancy = journeyStage === 'pregnancy';

  useEffect(() => {
    if (!isPregnancy) return;
    setPregnancyDueDate(toLocalYmd(pickerDate));
  }, [isPregnancy, pickerDate, setPregnancyDueDate]);

  const handleDateChange = (_event, selectedDate) => {
    if (!selectedDate) return;
    const next = clampDueDateToPregnancyBounds(selectedDate, minDate, maxDate);
    if (Platform.OS === 'android') {
      setShowPicker(false);
      setPickerDate(next);
      setPregnancyDueDate(toLocalYmd(next));
    } else {
      setTempDate(next);
    }
  };

  const handleIOSConfirm = () => {
    const next = tempDate ? clampDueDateToPregnancyBounds(tempDate, minDate, maxDate) : pickerDate;
    setPickerDate(next);
    setPregnancyDueDate(toLocalYmd(next));
    setShowPicker(false);
    setTempDate(null);
  };

  const handleIOSCancel = () => {
    setShowPicker(false);
    setTempDate(null);
  };

  const openPicker = () => {
    if (Platform.OS === 'ios') setTempDate(pickerDate);
    setShowPicker(true);
  };

  if (!isPregnancy) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <Text style={styles.title}>Tarih adımı</Text>
          <Text style={styles.subtitle}>
            Bu takvim adımı hamilelik yolculuğu içindir. İlerleyerek devam edebilirsiniz.
          </Text>
        </View>
        <View style={styles.bottom}>
          <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Placeholder13')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.title}>Bebeğinizin doğum tarihini hesaplayalım</Text>
        <Text style={styles.subtitle}>
          Tahmini doğum tarihinizi takvimden seçin (bugünden en fazla 9 ay sonrası).
        </Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{APPROX_TITLE}</Text>
          <TouchableOpacity style={styles.dateButton} onPress={openPicker} activeOpacity={0.7}>
            <Text style={styles.dateButtonText}>{formatShortDate(pickerDate)}</Text>
            <Text style={styles.dateHint}>Dokunarak değiştir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.comingSoonHeading}>Diğer yöntemler (yakında)</Text>
        {COMING_SOON_METHODS.map((label) => (
          <View key={label} style={styles.comingSoonRow}>
            <Text style={styles.comingSoonText}>{label}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Placeholder13')} />
      </View>

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleIOSCancel}>
                  <Text style={styles.modalCancel}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIOSConfirm}>
                  <Text style={styles.modalDone}>Tamam</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate || pickerDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minDate}
                maximumDate={maxDate}
                locale="tr-TR"
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  top: {
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 16,
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
  scrollInner: { paddingHorizontal: 20, paddingBottom: 16 },
  card: {
    borderWidth: 1.5,
    borderColor: '#C066A0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C066A0',
    marginBottom: 12,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FDF6F0',
  },
  dateButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3D3D',
  },
  dateHint: {
    fontSize: 12,
    color: '#7A7A7A',
    marginTop: 4,
  },
  comingSoonHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7A7A7A',
    marginBottom: 8,
  },
  comingSoonRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  bottom: { marginBottom: 40, paddingHorizontal: 20 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0E5',
  },
  modalCancel: {
    fontSize: 16,
    color: '#7A7A7A',
  },
  modalDone: {
    fontSize: 16,
    color: '#C066A0',
    fontWeight: '600',
  },
});
