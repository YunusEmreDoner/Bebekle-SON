import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DailyTipScreen from '../screens/baby/DailyTipScreen';
import BabyDevelopmentScreen from '../screens/baby/BabyDevelopmentScreen';
import MyBodyScreen from '../screens/baby/MyBodyScreen';
import StoryViewerScreen from '../screens/stories/StoryViewerScreen';
import GenderPredictionScreen from '../screens/tools/genderAssumption/GenderPredictionScreen';
import GenderAssumptionDetailScreen from '../screens/tools/genderAssumption/GenderAssumptionDetailScreen';
import DailyQuizScreen from '../screens/tools/quiz/DailyQuizScreen';
import ZodiacScreen from '../screens/tools/zodiac/ZodiacScreen';
import FoodRecipeScreen from '../screens/tools/recipe/FoodRecipeScreen';
import QuizCardScreen from '../screens/cards/QuizCardScreen';
import InfoCardScreen from '../screens/cards/InfoCardScreen';
import VideoListScreen from '../screens/cards/VideoListScreen';
import DailyNewsScreen from '../screens/cards/DailyNewsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DailyTip" component={DailyTipScreen} options={{ headerShown: true, title: 'Daily Tip' }} />
      <Stack.Screen name="BabyDevelopment" component={BabyDevelopmentScreen} options={{ headerShown: true, title: 'Baby Development' }} />
      <Stack.Screen name="MyBody" component={MyBodyScreen} options={{ headerShown: true, title: 'My Body' }} />
      <Stack.Screen name="StoryViewer" component={StoryViewerScreen} options={{ headerShown: false, presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="GenderPrediction" component={GenderPredictionScreen} options={{ headerShown: true, title: 'Cinsiyet tahmini' }} />
      <Stack.Screen name="DailyQuiz" component={DailyQuizScreen} options={{ headerShown: true, title: 'Günlük Quiz' }} />
      <Stack.Screen
        name="GenderAssumptionDetail"
        component={GenderAssumptionDetailScreen}
        options={{ headerShown: true, title: 'Tahmin' }}
      />
      <Stack.Screen name="Zodiac" component={ZodiacScreen} options={{ headerShown: true, title: 'Burç' }} />
      <Stack.Screen name="FoodRecipe" component={FoodRecipeScreen} options={{ headerShown: true, title: 'Günün tarifi' }} />
      <Stack.Screen name="QuizCard" component={QuizCardScreen} options={{ headerShown: true, title: 'Quiz Cards' }} />
      <Stack.Screen name="InfoCard" component={InfoCardScreen} options={{ headerShown: true, title: 'Info Cards' }} />
      <Stack.Screen name="VideoList" component={VideoListScreen} options={{ headerShown: true, title: 'Videos' }} />
      <Stack.Screen name="DailyNews" component={DailyNewsScreen} options={{ headerShown: true, title: 'Daily News' }} />
    </Stack.Navigator>
  );
}
