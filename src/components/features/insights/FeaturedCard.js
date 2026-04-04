import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeaturedCard({ onPress }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={['#D4C5F0', '#F2C4CE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Öne çıkan</Text>
          </View>
          <Text style={styles.title}>
            Hamilelikte beslenme rehberi: Neler yemeli, nelerden kaçınmalı?
          </Text>
          <Text style={styles.sub}>5 dk okuma</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    height: 140,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#9B5CC4',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#3D3D3D',
    lineHeight: 22,
  },
  sub: {
    fontSize: 12,
    color: '#7A7A7A',
    marginTop: 4,
  },
});
