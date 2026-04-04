import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../components/common/CustomHeader';
import DiaryTab from './tabs/DiaryTab';
import MemoriesTab from './tabs/MemoriesTab';
import { COLORS } from '../../../theme/colors';

const TopTab = createMaterialTopTabNavigator();

export default function JournalHomeScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="Journal" />
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.mor,
          tabBarInactiveTintColor: COLORS.metinAcik,
          tabBarIndicatorStyle: { backgroundColor: COLORS.mor },
          tabBarStyle: { backgroundColor: COLORS.beyaz },
          tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
        }}
      >
        <TopTab.Screen name="Diary" component={DiaryTab} />
        <TopTab.Screen name="Memories" component={MemoriesTab} />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
});
