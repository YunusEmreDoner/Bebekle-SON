import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DotIndicator from '../../../components/features/onboarding/DotIndicator';
import PrimaryButton from '../../../components/common/PrimaryButton';

export default function Onboarding3Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#7A7A7A" />
        </TouchableOpacity>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content} />

      <View style={styles.bottom}>
        <DotIndicator total={3} active={2} />
        <PrimaryButton title="Başla" onPress={() => navigation.navigate('NameInput')} />
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
  headerRight: { width: 40 },
  content: { flex: 1, paddingHorizontal: 20 },
  bottom: { marginBottom: 40 },
});
