import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import CustomHeader from '../../components/common/CustomHeader';
import BabyPageSection from '../../components/home/BabyPageSection';
import DailyStoriesRow from '../../components/home/DailyStoriesRow';
import ToolsRow from '../../components/home/ToolsRow';
import CardsGrid from '../../components/home/CardsGrid';
import { COLORS } from '../../theme/colors';

let permissionRequested = false;

export default function HomeScreen({ navigation }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (permissionRequested) return;
    permissionRequested = true;
    timerRef.current = setTimeout(() => {
      Notifications.requestPermissionsAsync();
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <CustomHeader title="Bebekle" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BabyPageSection navigation={navigation} />
        <DailyStoriesRow navigation={navigation} />
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
});
