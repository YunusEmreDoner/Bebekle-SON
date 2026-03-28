import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const TOOLS = [
  { id: 'GenderPrediction', label: 'Gender Prediction', icon: '👶' },
  { id: 'GenderQuiz', label: 'Quiz', icon: '❓' },
  { id: 'Zodiac', label: 'Zodiac', icon: '⭐' },
  { id: 'FoodRecipe', label: 'Food Recipe', icon: '🍎' },
];

export default function ToolsRow({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tools</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {TOOLS.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={styles.toolBox}
            onPress={() => navigation.navigate(tool.id)}
          >
            <Text style={styles.toolIcon}>{tool.icon}</Text>
            <Text style={styles.toolLabel}>{tool.label}</Text>
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
    marginTop: 8,
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
  toolBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.acikGri,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  toolLabel: {
    fontSize: 10,
    color: COLORS.metin,
    textAlign: 'center',
  },
});
