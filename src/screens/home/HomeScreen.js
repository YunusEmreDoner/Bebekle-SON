import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import CustomHeader from '../../components/common/CustomHeader';
import BabyPageSection from '../../components/home/BabyPageSection';
import DailyStoriesRow from '../../components/home/DailyStoriesRow';
import ToolsRow from '../../components/home/ToolsRow';
import CardsGrid from '../../components/home/CardsGrid';
import { COLORS } from '../../theme/colors';
import { calculatePregnancyInfo } from '../../data/pregnancyHelper';
import { getDayData } from '../../data/daily/index';

const getDefaultDueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 140);
  return d;
};

let permissionRequested = false;

export default function HomeScreen({ navigation }) {
  const timerRef = useRef(null);
  const [dueDate, setDueDate] = useState(getDefaultDueDate);

  useEffect(() => {
    if (permissionRequested) return;
    permissionRequested = true;
    timerRef.current = setTimeout(() => {
      Notifications.requestPermissionsAsync();
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
