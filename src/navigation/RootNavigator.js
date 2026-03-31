import React, { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import { OnboardingContext } from '../context/OnboardingContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  const completeOnboarding = useCallback(() => {
    setIsOnboarded(true);
  }, []);

  if (!isOnboarded) {
    return (
      <OnboardingContext.Provider value={completeOnboarding}>
        <AuthNavigator />
      </OnboardingContext.Provider>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Bildirimler' }}
      />
    </Stack.Navigator>
  );
}
