import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../../../theme/colors';
import { formatShortDate } from '../../../../utils/dateFormatting';
import { calculatePregnancyInfo } from '../../../../utils/pregnancyCalculations';
import { getWeekData } from '../../../../domain/pregnancy/content/weekly/index';
import { getDayData } from '../../../../domain/pregnancy/content/daily/index';
import {
  getPregnancyDueDateMaximumDate,
  getPregnancyDueDateMinimumDate,
} from '../../../../utils/pregnancyDueDateBounds';

const { height } = Dimensions.get('window');

export default function BabyPageSection({ navigation, dueDate, onDueDateChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(null);

  const pregnancyInfo = calculatePregnancyInfo(dueDate);
  const weekData = getWeekData(pregnancyInfo.currentWeek);
  getDayData(pregnancyInfo.currentDay);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (selectedDate) onDueDateChange(selectedDate);
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const handleIOSConfirm = () => {
    if (tempDate) onDueDateChange(tempDate);
    setShowPicker(false);
    setTempDate(null);
  };

  const handleIOSCancel = () => {
    setShowPicker(false);
    setTempDate(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: weekData.backgroundColors.secondary }]}>
      <TouchableOpacity style={styles.dueDateRow} onPress={() => setShowPicker(true)}>
        <Text style={styles.dueDateText}>Tahmini doğum: {formatShortDate(dueDate)}</Text>
        <Ionicons name="pencil-outline" size={14} color={COLORS.mor} style={styles.editIcon} />
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: weekData.backgroundColors.primary }]}>
        <Text style={styles.weekTitle}>{pregnancyInfo.currentWeek}. Hafta</Text>
        <Text style={styles.babySize}>{weekData.babySize} büyüklüğünde</Text>

        <View style={styles.statsRow}>
          {weekData.babyLength && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weekData.babyLength}</Text>
              <Text style={styles.statLabel}>Boy</Text>
            </View>
          )}
          {weekData.babyWeight && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weekData.babyWeight}</Text>
              <Text style={styles.statLabel}>Ağırlık</Text>
            </View>
          )}
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pregnancyInfo.daysUntilDue}</Text>
            <Text style={styles.statLabel}>Gün kaldı</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('DailyTip', { currentDay: pregnancyInfo.currentDay })}
        >
          <Text style={styles.actionText}>Daily Tip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('BabyDevelopment', { currentWeek: pregnancyInfo.currentWeek })}
        >
          <Text style={styles.actionText}>What Happens to Baby</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('MyBody', { currentWeek: pregnancyInfo.currentWeek })}
        >
          <Text style={styles.actionText}>My Body</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={getPregnancyDueDateMinimumDate()}
          maximumDate={getPregnancyDueDateMaximumDate()}
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
                value={tempDate || dueDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={getPregnancyDueDateMinimumDate()}
                maximumDate={getPregnancyDueDateMaximumDate()}
                locale="tr-TR"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height * 0.42,
    padding: 16,
    paddingTop: 12,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dueDateText: {
    fontSize: 13,
    color: COLORS.metin,
    fontWeight: '500',
  },
  editIcon: {
    marginLeft: 5,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 4,
  },
  babySize: {
    fontSize: 14,
    color: COLORS.metinAcik,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.metin,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.metinAcik,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBox: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.mor,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: COLORS.beyaz,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalCancel: {
    fontSize: 16,
    color: COLORS.metinAcik,
  },
  modalDone: {
    fontSize: 16,
    color: COLORS.mor,
    fontWeight: '600',
  },
});
