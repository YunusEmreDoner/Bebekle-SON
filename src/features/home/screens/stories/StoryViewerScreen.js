import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STORY_DURATION = 5000;

export default function StoryViewerScreen({ navigation, route }) {
  const stories = route?.params?.stories || [];
  const initialIndex = route?.params?.initialIndex ?? 0;
  const [currentIndex, setCurrentIndex] = useState(
    Math.max(0, Math.min(initialIndex, stories.length - 1))
  );
  const currentIndexRef = useRef(currentIndex);
  const tapX = useRef(0);
  const moved = useRef(false);
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (stories.length === 0) {
      navigation.goBack();
      return;
    }
    progress.setValue(0);
    if (animRef.current) animRef.current.stop();
    animRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    animRef.current.start(({ finished }) => {
      if (!finished) return;
      const idx = currentIndexRef.current;
      if (idx < stories.length - 1) {
        setCurrentIndex(idx + 1);
      } else {
        navigation.goBack();
      }
    });
    return () => {
      if (animRef.current) animRef.current.stop();
    };
  }, [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        tapX.current = evt.nativeEvent.locationX;
        moved.current = false;
      },
      onPanResponderMove: (_, gs) => {
        if (Math.abs(gs.dx) > 5) moved.current = true;
      },
      onPanResponderRelease: (_, gs) => {
        const idx = currentIndexRef.current;
        if (!moved.current) {
          if (tapX.current < SCREEN_WIDTH * 0.4) {
            if (idx > 0) setCurrentIndex(idx - 1);
          } else {
            if (idx < stories.length - 1) setCurrentIndex(idx + 1);
            else navigation.goBack();
          }
        } else if (gs.dx < -50) {
          if (idx < stories.length - 1) setCurrentIndex(idx + 1);
          else navigation.goBack();
        } else if (gs.dx > 50) {
          if (idx > 0) setCurrentIndex(idx - 1);
        }
      },
    })
  ).current;

  const handleLinkTo = (linkTo) => {
    if (linkTo === 'News') {
      navigation.navigate('DailyNews');
    } else if (linkTo === 'Insights' || linkTo === 'Journal' || linkTo === 'Community') {
      navigation.navigate(linkTo);
    }
  };

  if (stories.length === 0) return null;

  const story = stories[currentIndex];

  return (
    <View
      style={[styles.container, { backgroundColor: story.backgroundColor || '#F2C4CE' }]}
      {...panResponder.panHandlers}
    >
      <StatusBar hidden />

      <View style={styles.contentArea} pointerEvents="none">
        <Text style={styles.storyTitle}>{story.title}</Text>
        <Text style={styles.storyContent}>{story.content}</Text>
      </View>

      <View style={styles.progressRow}>
        {stories.map((_, i) => (
          <View key={i} style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    i < currentIndex
                      ? '100%'
                      : i === currentIndex
                        ? progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
                        : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {story.linkTo && (
        <TouchableOpacity style={styles.linkBtn} onPress={() => handleLinkTo(story.linkTo)}>
          <Text style={styles.linkBtnText}>Daha Fazla</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  storyContent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
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
    backgroundColor: 'rgba(255,255,255,0.35)',
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
  linkBtn: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  linkBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
