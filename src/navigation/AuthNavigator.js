import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1Screen from '../screens/auth/Onboarding1Screen';
import Onboarding2Screen from '../screens/auth/Onboarding2Screen';
import Onboarding3Screen from '../screens/auth/Onboarding3Screen';
import NameInputScreen from '../screens/auth/NameInputScreen';
import GoalSelectionScreen from '../screens/auth/GoalSelectionScreen';
import Placeholder6Screen from '../screens/auth/Placeholder6Screen';
import ChoiceScreen from '../screens/auth/ChoiceScreen';
import Placeholder8Screen from '../screens/auth/Placeholder8Screen';
import ProfileSummaryScreen from '../screens/auth/ProfileSummaryScreen';
import FeaturesScreen from '../screens/auth/FeaturesScreen';
import Placeholder11Screen from '../screens/auth/Placeholder11Screen';
import DateMethodScreen from '../screens/auth/DateMethodScreen';
import Placeholder13Screen from '../screens/auth/Placeholder13Screen';
import FlipCards10Screen from '../screens/auth/FlipCards10Screen';
import FlipCards6Screen from '../screens/auth/FlipCards6Screen';
import Placeholder16Screen from '../screens/auth/Placeholder16Screen';
import ComparisonScreen from '../screens/auth/ComparisonScreen';
import PaywallScreen from '../screens/auth/PaywallScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
      <Stack.Screen name="NameInput" component={NameInputScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="Placeholder6" component={Placeholder6Screen} />
      <Stack.Screen name="Choice" component={ChoiceScreen} />
      <Stack.Screen name="Placeholder8" component={Placeholder8Screen} />
      <Stack.Screen name="ProfileSummary" component={ProfileSummaryScreen} />
      <Stack.Screen name="Features" component={FeaturesScreen} />
      <Stack.Screen name="Placeholder11" component={Placeholder11Screen} />
      <Stack.Screen name="DateMethod" component={DateMethodScreen} />
      <Stack.Screen name="Placeholder13" component={Placeholder13Screen} />
      <Stack.Screen name="FlipCards10" component={FlipCards10Screen} />
      <Stack.Screen name="FlipCards6" component={FlipCards6Screen} />
      <Stack.Screen name="Placeholder16" component={Placeholder16Screen} />
      <Stack.Screen name="Comparison" component={ComparisonScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
    </Stack.Navigator>
  );
}
