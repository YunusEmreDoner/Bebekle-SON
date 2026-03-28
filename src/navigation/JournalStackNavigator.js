import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalHomeScreen from '../screens/journal/JournalHomeScreen';
import DiaryEntryScreen from '../screens/journal/DiaryEntryScreen';
import MemoryCreateScreen from '../screens/journal/MemoryCreateScreen';
import MemoryDetailScreen from '../screens/journal/MemoryDetailScreen';
import PostDetailScreen from '../screens/community/PostDetailScreen';

const Stack = createNativeStackNavigator();

export default function JournalStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalMain" component={JournalHomeScreen} />
      <Stack.Screen name="DiaryEntry" component={DiaryEntryScreen} options={{ headerShown: true, title: 'Diary Entry' }} />
      <Stack.Screen name="MemoryCreate" component={MemoryCreateScreen} options={{ headerShown: true, title: 'New Memory' }} />
      <Stack.Screen name="MemoryDetail" component={MemoryDetailScreen} options={{ headerShown: true, title: 'Memory' }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerShown: true, title: 'Post' }} />
    </Stack.Navigator>
  );
}
