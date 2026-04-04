import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityHomeScreen from '../screens/CommunityHomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ForumDetailScreen from '../screens/ForumDetailScreen';
import GroupChatScreen from '../screens/GroupChatScreen';

const Stack = createNativeStackNavigator();

export default function CommunityStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={CommunityHomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerShown: true, title: 'Post' }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: true, title: 'New Post' }} />
      <Stack.Screen name="ForumDetail" component={ForumDetailScreen} options={{ headerShown: true, title: 'Forum' }} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ headerShown: true, title: 'Group' }} />
    </Stack.Navigator>
  );
}
