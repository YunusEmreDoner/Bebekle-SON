import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function AppInContentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppInContentScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.beyaz,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.metin,
  },
});
