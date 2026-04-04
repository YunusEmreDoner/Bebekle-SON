import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DotIndicator from '../../../components/features/onboarding/DotIndicator';
import PrimaryButton from '../../../components/common/PrimaryButton';

export default function Onboarding1Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <TouchableOpacity onPress={() => navigation.navigate('NameInput')}>
          <Text style={styles.skip}>Atla</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content} />

      <View style={styles.bottom}>
        <DotIndicator total={3} active={0} />
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Onboarding2')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    height: 48,
  },
  headerLeft: { width: 40 },
  skip: { fontSize: 15, fontWeight: '600', color: '#7A7A7A' },
  content: { flex: 1, paddingHorizontal: 20 },
  bottom: { marginBottom: 40 },
});
