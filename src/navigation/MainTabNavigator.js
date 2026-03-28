import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import InsightsStackNavigator from './InsightsStackNavigator';
import CommunityStackNavigator from './CommunityStackNavigator';
import JournalStackNavigator from './JournalStackNavigator';
import AIFloatingButton from '../components/common/AIFloatingButton';
import AIChatScreen from '../screens/ai/AIChatScreen';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const [aiVisible, setAiVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.mor,
          tabBarInactiveTintColor: COLORS.metinAcik,
          tabBarStyle: {
            backgroundColor: COLORS.beyaz,
            borderTopColor: COLORS.border,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Insights') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Journal') {
              iconName = focused ? 'journal' : 'journal-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Insights" component={InsightsStackNavigator} />
        <Tab.Screen name="Community" component={CommunityStackNavigator} />
        <Tab.Screen name="Journal" component={JournalStackNavigator} />
      </Tab.Navigator>

      <AIFloatingButton onPress={() => setAiVisible(true)} />

      <Modal
        visible={aiVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setAiVisible(false)}
      >
        <AIChatScreen navigation={{ goBack: () => setAiVisible(false) }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
