import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function ProfileSummaryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.titleBar} />
        <View style={styles.subtitleBar} />

        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Profil Özeti</Text>
        </View>

        <Text style={styles.note}>Profil bilgilerini daha sonra düzenleyebilirsin</Text>
      </View>
      <View style={styles.bottom}>
        <PrimaryButton title="Devam et" onPress={() => navigation.navigate('Features')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  titleBar: {
    height: 30,
    width: '60%',
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
  },
  subtitleBar: {
    height: 20,
    width: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginTop: 8,
  },
  summaryCard: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    backgroundColor: '#FDF6F0',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  summaryText: { fontSize: 16, color: '#7A7A7A' },
  note: {
    fontSize: 13,
    color: '#7A7A7A',
    marginTop: 12,
    textAlign: 'center',
  },
  bottom: { paddingBottom: 24 },
});
