import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthWelcomeScreen from '../screens/AuthWelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import Onboarding3Screen from '../screens/Onboarding3Screen';
import NameInputScreen from '../screens/NameInputScreen';
import GoalSelectionScreen from '../screens/GoalSelectionScreen';
import Placeholder6Screen from '../screens/Placeholder6Screen';
import ChoiceScreen from '../screens/ChoiceScreen';
import Placeholder8Screen from '../screens/Placeholder8Screen';
import ProfileSummaryScreen from '../screens/ProfileSummaryScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import Placeholder11Screen from '../screens/Placeholder11Screen';
import DateMethodScreen from '../screens/DateMethodScreen';
import Placeholder13Screen from '../screens/Placeholder13Screen';
import FlipCards10Screen from '../screens/FlipCards10Screen';
import FlipCards6Screen from '../screens/FlipCards6Screen';
import Placeholder16Screen from '../screens/Placeholder16Screen';
import ComparisonScreen from '../screens/ComparisonScreen';
import PaywallScreen from '../screens/PaywallScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AuthWelcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
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
