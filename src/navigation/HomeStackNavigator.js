import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import DailyTipScreen from '../screens/home/DailyTipScreen';
import BabyDevelopmentScreen from '../screens/home/BabyDevelopmentScreen';
import MyBodyScreen from '../screens/home/MyBodyScreen';
import StoryViewerScreen from '../screens/home/StoryViewerScreen';
import GenderPredictionScreen from '../screens/home/GenderPredictionScreen';
import GenderQuizScreen from '../screens/home/GenderQuizScreen';
import ZodiacScreen from '../screens/home/ZodiacScreen';
import FoodRecipeScreen from '../screens/home/FoodRecipeScreen';
import QuizCardScreen from '../screens/home/QuizCardScreen';
import InfoCardScreen from '../screens/home/InfoCardScreen';
import VideoListScreen from '../screens/home/VideoListScreen';
import DailyNewsScreen from '../screens/home/DailyNewsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DailyTip" component={DailyTipScreen} options={{ headerShown: true, title: 'Daily Tip' }} />
      <Stack.Screen name="BabyDevelopment" component={BabyDevelopmentScreen} options={{ headerShown: true, title: 'Baby Development' }} />
      <Stack.Screen name="MyBody" component={MyBodyScreen} options={{ headerShown: true, title: 'My Body' }} />
      <Stack.Screen name="StoryViewer" component={StoryViewerScreen} options={{ headerShown: false, presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="GenderPrediction" component={GenderPredictionScreen} options={{ headerShown: true, title: 'Gender Prediction' }} />
      <Stack.Screen name="GenderQuiz" component={GenderQuizScreen} options={{ headerShown: true, title: 'Quiz' }} />
      <Stack.Screen name="Zodiac" component={ZodiacScreen} options={{ headerShown: true, title: 'Zodiac' }} />
      <Stack.Screen name="FoodRecipe" component={FoodRecipeScreen} options={{ headerShown: true, title: 'Food Recipe' }} />
      <Stack.Screen name="QuizCard" component={QuizCardScreen} options={{ headerShown: true, title: 'Quiz Cards' }} />
      <Stack.Screen name="InfoCard" component={InfoCardScreen} options={{ headerShown: true, title: 'Info Cards' }} />
      <Stack.Screen name="VideoList" component={VideoListScreen} options={{ headerShown: true, title: 'Videos' }} />
      <Stack.Screen name="DailyNews" component={DailyNewsScreen} options={{ headerShown: true, title: 'Daily News' }} />
    </Stack.Navigator>
  );
}
