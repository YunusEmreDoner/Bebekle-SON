import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const STORIES = [
  { id: '1', label: 'Story 1' },
  { id: '2', label: 'Story 2' },
  { id: '3', label: 'Story 3' },
  { id: '4', label: 'Story 4' },
  { id: '5', label: 'Story 5' },
];

export default function DailyStoriesRow({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Daily Stories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {STORIES.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyCircle}
            onPress={() => navigation.navigate('StoryViewer', { storyId: story.id })}
          >
            <View style={styles.circle} />
            <Text style={styles.storyLabel}>{story.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: COLORS.beyaz,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.metin,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 12,
  },
  storyCircle: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.lavanda,
    borderWidth: 2,
    borderColor: COLORS.mor,
  },
  storyLabel: {
    fontSize: 11,
    color: COLORS.metinAcik,
    marginTop: 4,
  },
});
