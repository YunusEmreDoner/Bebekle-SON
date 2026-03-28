import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { height } = Dimensions.get('window');

export default function BabyPageSection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Hamilelik Haftası: 20. Hafta</Text>
      <Text style={styles.subPlaceholder}>[Baby Page Area]</Text>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('DailyTip')}
        >
          <Text style={styles.actionText}>Daily Tip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('BabyDevelopment')}
        >
          <Text style={styles.actionText}>What Happens to Baby</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('MyBody')}
        >
          <Text style={styles.actionText}>My Body</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.4,
    backgroundColor: COLORS.pudraPembesi,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholder: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.metin,
    marginBottom: 8,
  },
  subPlaceholder: {
    fontSize: 14,
    color: COLORS.metinAcik,
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBox: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.mor,
    textAlign: 'center',
  },
});
