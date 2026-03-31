import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function DailyStoriesRow({ stories, navigation }) {
  if (!stories || stories.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
    >
      {stories.map((story, index) => (
        <TouchableOpacity
          key={story.id}
          style={styles.storyItem}
          onPress={() => navigation.navigate('StoryViewer', { stories, initialIndex: index })}
        >
          <View style={[styles.circle, { backgroundColor: story.backgroundColor || COLORS.lavanda }]}>
            {story.image && (
              <Image source={story.image} style={styles.circleImage} />
            )}
          </View>
          <Text style={styles.storyLabel} numberOfLines={1}>
            {story.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: COLORS.beyaz,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 14,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.mor,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  storyLabel: {
    fontSize: 11,
    color: COLORS.metin,
    textAlign: 'center',
    marginTop: 4,
    width: 70,
  },
});
