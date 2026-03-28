import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';

const DIARY_ENTRIES = [
  { id: '1', date: '28 Mart 2026', preview: 'Bugün bebeğimin tekmeleri çok güçlüydü...' },
  { id: '2', date: '27 Mart 2026', preview: 'Doktor kontrolüne gittik, her şey yolunda.' },
];

const RECOMMENDED = [
  { id: 'r1', title: 'Önerilen Günlük 1' },
  { id: 'r2', title: 'Önerilen Günlük 2' },
];

export default function DiaryTab() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={DIARY_ENTRIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.entry}
            onPress={() => navigation.navigate('DiaryEntry', { entryId: item.id })}
          >
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryPreview}>{item.preview}</Text>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Paylaş</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.recommended}>
            <Text style={styles.recommendedTitle}>Önerilen Günlükler</Text>
            {RECOMMENDED.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendedItem}
                onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
              >
                <Text style={styles.recommendedText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('DiaryEntry', { entryId: null })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  entry: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.metinAcik,
    marginBottom: 4,
  },
  entryPreview: {
    fontSize: 14,
    color: COLORS.metin,
    marginBottom: 8,
  },
  shareBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mor,
  },
  shareBtnText: {
    color: COLORS.mor,
    fontSize: 12,
  },
  recommended: {
    padding: 16,
    backgroundColor: COLORS.acikGri,
    marginTop: 8,
  },
  recommendedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 8,
  },
  recommendedItem: {
    padding: 12,
    backgroundColor: COLORS.beyaz,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recommendedText: {
    color: COLORS.metin,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.mor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    color: COLORS.beyaz,
    fontSize: 28,
    lineHeight: 30,
  },
});
