import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FlipCard({ isFlipped, isSelected, onPress, style }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontRotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={[styles.container, style, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.face,
          styles.front,
          { transform: [{ perspective: 800 }, { rotateY: frontRotate }] },
        ]}
      >
        <Text style={styles.frontText}>?</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.face,
          styles.back,
          { transform: [{ perspective: 800 }, { rotateY: backRotate }] },
        ]}
      >
        <Text style={styles.backText}>✓</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0E5',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#C066A0',
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  front: {
    backgroundColor: '#F0F0F0',
  },
  back: {
    backgroundColor: '#D4C5F0',
  },
  frontText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7A7A7A',
  },
  backText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
