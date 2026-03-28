import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DotIndicator from '../../components/auth/DotIndicator';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function Onboarding1Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <TouchableOpacity onPress={() => navigation.navigate('NameInput')}>
          <Text style={styles.skip}>Atla</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>İçerik alanı</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <DotIndicator total={3} active={0} />
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Onboarding2')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    height: 48,
  },
  headerLeft: { width: 40 },
  skip: { fontSize: 15, fontWeight: '600', color: '#C066A0' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  placeholder: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { fontSize: 16, color: '#7A7A7A' },
  bottom: { paddingBottom: 24 },
});
