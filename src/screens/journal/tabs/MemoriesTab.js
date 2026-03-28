import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';

const MEMORIES = [
  { id: '1', title: 'İlk ultrasound', date: '10 Ocak 2026' },
  { id: '2', title: 'Cinsiyet öğrendik!', date: '5 Şubat 2026' },
  { id: '3', title: 'Bebek odası hazırlandı', date: '20 Mart 2026' },
];

const RECOMMENDED = [
  { id: 'r1', title: 'Önerilen Anı 1' },
  { id: 'r2', title: 'Önerilen Anı 2' },
];

export default function MemoriesTab() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={MEMORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.memoryCard}
            onPress={() => navigation.navigate('MemoryDetail', { memoryId: item.id })}
          >
            <View style={styles.memoryImage} />
            <Text style={styles.memoryTitle}>{item.title}</Text>
            <Text style={styles.memoryDate}>{item.date}</Text>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Paylaş</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.recommended}>
            <Text style={styles.recommendedTitle}>Önerilen Anılar</Text>
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
        onPress={() => navigation.navigate('MemoryCreate')}
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  memoryCard: {
    width: '48%',
    backgroundColor: COLORS.acikGri,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
  },
  memoryImage: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.lavanda,
    borderRadius: 8,
    marginBottom: 6,
  },
  memoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.metin,
    marginBottom: 2,
  },
  memoryDate: {
    fontSize: 11,
    color: COLORS.metinAcik,
    marginBottom: 4,
  },
  shareBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mor,
  },
  shareBtnText: {
    color: COLORS.mor,
    fontSize: 11,
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
