import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import CustomHeader from '../../components/common/CustomHeader';
import BabyPageSection from '../../components/home/baby/BabyPageSection';
import DailyStoriesRow from '../../components/home/stories/DailyStoriesRow';
import ToolsRow from '../../components/home/tools/ToolsRow';
import CardsGrid from '../../components/home/cards/CardsGrid';
import { COLORS } from '../../theme/colors';
import { calculatePregnancyInfo } from '../../data/pregnancyHelper';
import { getDayData } from '../../data/daily/index';

const getDefaultDueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 140);
  return d;
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
  const [dueDate, setDueDate] = useState(getDefaultDueDate);

  useEffect(() => {
    if (permissionRequested) return;
    permissionRequested = true;
    timerRef.current = setTimeout(() => {
      const Notifications = getExpoNotifications();
      Notifications?.requestPermissionsAsync?.();
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

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
          onDueDateChange={setDueDate}
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
