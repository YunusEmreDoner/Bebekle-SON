import React, { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from '../../features/onboarding/navigation/AuthNavigator';
import ProfileStackNavigator from '../../features/profile/navigation/ProfileStackNavigator';
import NotificationsScreen from '../../features/notifications/screens/NotificationsScreen';
import { OnboardingContext } from '../../features/onboarding/context/OnboardingContext';
import { OnboardingDataProvider } from '../../features/onboarding/context/OnboardingDataContext';
import { shouldSkipAuthFlow } from '../../config/appFlow';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isOnboarded, setIsOnboarded] = useState(() => shouldSkipAuthFlow());

  const completeOnboarding = useCallback(() => {
    setIsOnboarded(true);
  }, []);

  if (!isOnboarded) {
    return (
      <OnboardingContext.Provider value={completeOnboarding}>
        <OnboardingDataProvider>
          <AuthNavigator />
        </OnboardingDataProvider>
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
