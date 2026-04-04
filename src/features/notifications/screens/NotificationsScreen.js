import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';

const SAMPLE_NOTIFICATIONS = [
  { id: '1', text: 'Bebeğiniz bu hafta mango büyüklüğünde!' },
  { id: '2', text: 'Yeni bir makale sizin için hazır.' },
  { id: '3', text: 'Günlük ipucunuzu okudunuz mu?' },
  { id: '4', text: 'Toplulukta yeni bir yorum var.' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.title}>Bildirimler</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.metin,
    padding: 16,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.metin,
  },
});
