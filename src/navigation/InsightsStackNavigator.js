import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsightsHomeScreen from '../screens/insights/InsightsHomeScreen';
import BookmarksScreen from '../screens/insights/BookmarksScreen';
import OnedioContentScreen from '../screens/insights/OnedioContentScreen';
import AppInContentScreen from '../screens/insights/AppInContentScreen';
import WebContentScreen from '../screens/insights/WebContentScreen';
import NewsScreen from '../screens/insights/NewsScreen';
import ArticlesScreen from '../screens/insights/ArticlesScreen';
import DocProCommentsScreen from '../screens/insights/DocProCommentsScreen';
import FloTipsScreen from '../screens/insights/FloTipsScreen';

const Stack = createNativeStackNavigator();

export default function InsightsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InsightsMain" component={InsightsHomeScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ headerShown: true, title: 'Bookmarks' }} />
      <Stack.Screen name="OnedioContent" component={OnedioContentScreen} options={{ headerShown: true, title: 'Content' }} />
      <Stack.Screen name="AppInContent" component={AppInContentScreen} options={{ headerShown: true, title: 'App Content' }} />
      <Stack.Screen name="WebContent" component={WebContentScreen} options={{ headerShown: true, title: 'Web Content' }} />
      <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: true, title: 'News' }} />
      <Stack.Screen name="Articles" component={ArticlesScreen} options={{ headerShown: true, title: 'Articles' }} />
      <Stack.Screen name="DocProComments" component={DocProCommentsScreen} options={{ headerShown: true, title: 'Doc & Pro Comments' }} />
      <Stack.Screen name="FloTips" component={FloTipsScreen} options={{ headerShown: true, title: 'Tips' }} />
    </Stack.Navigator>
  );
}
