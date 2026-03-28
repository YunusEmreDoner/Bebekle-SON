import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ExperienceScreen from '../screens/profile/ExperienceScreen';
import EditBabyScreen from '../screens/profile/EditBabyScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import HideContentScreen from '../screens/profile/HideContentScreen';
import NotificationSettingsScreen from '../screens/profile/NotificationSettingsScreen';
import SubscriptionScreen from '../screens/profile/SubscriptionScreen';
import RemindersScreen from '../screens/profile/RemindersScreen';
import PartnerConnectionScreen from '../screens/profile/PartnerConnectionScreen';
import PrivacyScreen from '../screens/profile/PrivacyScreen';
import HelpScreen from '../screens/profile/HelpScreen';
import LegalScreen from '../screens/profile/LegalScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';
import TermsScreen from '../screens/profile/TermsScreen';
import AccessibilityScreen from '../screens/profile/AccessibilityScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'View Profile' }} />
      <Stack.Screen name="Experience" component={ExperienceScreen} options={{ title: 'Your Experience' }} />
      <Stack.Screen name="EditBaby" component={EditBabyScreen} options={{ title: 'Edit Baby' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="HideContent" component={HideContentScreen} options={{ title: 'Hide Content' }} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription' }} />
      <Stack.Screen name="Reminders" component={RemindersScreen} options={{ title: 'Reminders' }} />
      <Stack.Screen name="PartnerConnection" component={PartnerConnectionScreen} options={{ title: 'Partner Connection' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy' }} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help' }} />
      <Stack.Screen name="Legal" component={LegalScreen} options={{ title: 'Legal' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms of Use' }} />
      <Stack.Screen name="Accessibility" component={AccessibilityScreen} options={{ title: 'Accessibility' }} />
    </Stack.Navigator>
  );
}
