import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
import PopularTab from './tabs/PopularTab';
import FollowingForumsTab from './tabs/FollowingForumsTab';
import GroupsTab from './tabs/GroupsTab';
import OtherTab from './tabs/OtherTab';
import { COLORS } from '../../../theme/colors';

const TopTab = createMaterialTopTabNavigator();

export default function CommunityHomeScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="Community" />
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.mor,
          tabBarInactiveTintColor: COLORS.metinAcik,
          tabBarIndicatorStyle: { backgroundColor: COLORS.mor },
          tabBarStyle: { backgroundColor: COLORS.beyaz },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          tabBarScrollEnabled: true,
        }}
      >
        <TopTab.Screen name="Popular" component={PopularTab} />
        <TopTab.Screen name="Following Forums" component={FollowingForumsTab} />
        <TopTab.Screen name="Groups" component={GroupsTab} />
        <TopTab.Screen name="Other" component={OtherTab} />
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
