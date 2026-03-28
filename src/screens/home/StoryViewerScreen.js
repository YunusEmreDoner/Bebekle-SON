import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableWithoutFeedback, TouchableOpacity,
  Dimensions, StyleSheet, StatusBar, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000;

const STORIES = [
  { id: '1', title: 'Story 1', color: COLORS.pudraPembesi },
  { id: '2', title: 'Story 2', color: COLORS.lavanda },
  { id: '3', title: 'Story 3', color: COLORS.mor },
  { id: '4', title: 'Story 4', color: COLORS.koyuMor },
  { id: '5', title: 'Story 5', color: COLORS.pudraPembesi },
];

export default function StoryViewerScreen({ navigation, route }) {
  const startIndex = route?.params?.storyId
    ? STORIES.findIndex((s) => s.id === route.params.storyId)
    : 0;
  const [currentIndex, setCurrentIndex] = useState(Math.max(startIndex, 0));
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef(null);

  const startProgress = () => {
    progress.setValue(0);
    animRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    animRef.current.start(({ finished }) => {
      if (finished) goNext();
    });
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (animRef.current) animRef.current.stop();
    };
  }, [currentIndex]);

  const goNext = () => {
    if (currentIndex < STORIES.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigation.goBack();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleTap = (evt) => {
    const x = evt.nativeEvent.locationX;
    if (x < SCREEN_WIDTH / 2) {
      goPrev();
    } else {
      goNext();
    }
  };

  const story = STORIES[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Progress bars */}
      <View style={styles.progressRow}>
        {STORIES.map((_, i) => (
          <View key={i} style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    i < currentIndex
                      ? '100%'
                      : i === currentIndex
                        ? progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          })
                        : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Story content */}
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={[styles.storyContent, { backgroundColor: story.color }]}>
          <Text style={styles.storyTitle}>{story.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    gap: 4,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 16,
    zIndex: 20,
    padding: 4,
  },
  storyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
});
