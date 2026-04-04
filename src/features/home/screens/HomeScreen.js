import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import CustomHeader from '../../../components/common/CustomHeader';
import BabyPageSection from '../../../components/features/home/baby/BabyPageSection';
import DailyStoriesRow from '../../../components/features/home/stories/DailyStoriesRow';
import ToolsRow from '../../../components/features/home/tools/ToolsRow';
import CardsGrid from '../../../components/features/home/cards/CardsGrid';
import { COLORS } from '../../../theme/colors';
import { calculatePregnancyInfo } from '../../../utils/pregnancyCalculations';
import { getDayData } from '../../../domain/pregnancy/content/daily/index';
import { useAuth } from '../../../hooks/useAuth';
import * as babyService from '../../../api/babyService';
import {
  clampDueDateToPregnancyBounds,
  parseYmdToLocalDate,
  toLocalYmd,
} from '../../../utils/pregnancyDueDateBounds';

const getDefaultDueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 140);
  return clampDueDateToPregnancyBounds(d);
};

/** Android Expo Go: expo-notifications throws on load (SDK 53+). Dev build / iOS still load it. */
function getExpoNotifications() {
  if (Platform.OS === 'android' && Constants.appOwnership === 'expo') {
    return null;
  }
  try {
    return require('expo-notifications');
  } catch {
    return null;
  }
}

let permissionRequested = false;

export default function HomeScreen({ navigation }) {
  const timerRef = useRef(null);
  const { user, loading: authLoading } = useAuth();
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [activeBabyId, setActiveBabyId] = useState(null);

  useEffect(() => {
    if (permissionRequested) return;
    permissionRequested = true;
    timerRef.current = setTimeout(() => {
      const Notifications = getExpoNotifications();
      Notifications?.requestPermissionsAsync?.();
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadDueDate() {
      if (authLoading) return;
      if (!user?.id) {
        setDueDate(getDefaultDueDate());
        setActiveBabyId(null);
        return;
      }

      const { babyId, dueDateYmd, error } = await babyService.fetchPregnancyDueDateForUser(user.id);
      if (cancelled) return;

      if (error) {
        console.warn('[home] due date fetch', error.message);
        setDueDate(getDefaultDueDate());
        setActiveBabyId(null);
        return;
      }

      if (babyId && dueDateYmd) {
        setActiveBabyId(babyId);
        setDueDate(parseYmdToLocalDate(dueDateYmd));
      } else {
        setActiveBabyId(null);
        setDueDate(getDefaultDueDate());
      }
    }

    loadDueDate();
    return () => {
      cancelled = true;
    };
  }, [user?.id, authLoading]);

  const onDueDateChange = useCallback(
    async (date) => {
      const clamped = clampDueDateToPregnancyBounds(date);
      setDueDate(clamped);
      const ymd = toLocalYmd(clamped);
      if (!user?.id || !activeBabyId) return;
      const { error } = await babyService.updateBabyDueDate(activeBabyId, ymd);
      if (error) {
        Alert.alert('Kayıt', error.message ?? 'Tahmini doğum güncellenemedi.');
      }
    },
    [user?.id, activeBabyId]
  );

  const { currentDay } = calculatePregnancyInfo(dueDate);
  const dailyData = getDayData(currentDay);
  const stories = dailyData.stories || [];

  return (
    <>
      <CustomHeader title="Bebekle" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BabyPageSection
          navigation={navigation}
          dueDate={dueDate}
          onDueDateChange={onDueDateChange}
        />
        {stories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Daily Stories</Text>
            <DailyStoriesRow stories={stories} navigation={navigation} />
          </>
        )}
        <ToolsRow navigation={navigation} />
        <CardsGrid navigation={navigation} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.acikGri,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.metin,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: COLORS.beyaz,
  },
});
