import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function OnedioContentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnedioContentScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppInContent')}>
        <Text style={styles.buttonText}>App-in Content</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WebContent')}>
        <Text style={styles.buttonText}>Web Content</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.beyaz,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.metin,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.mor,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.beyaz,
    fontWeight: '600',
  },
});
