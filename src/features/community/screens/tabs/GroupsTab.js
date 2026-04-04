import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';

const GROUPS = [
  { id: '1', name: 'Yeni Anneler Grubu', members: 1240, lastMsg: 'Herkese merhaba!' },
  { id: '2', name: 'İkinci Trimester', members: 876, lastMsg: 'Bebek hareketleri başladı!' },
  { id: '3', name: 'Doğum Sonrası Destek', members: 2100, lastMsg: 'Emzirme soruları...' },
];

export default function GroupsTab() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={GROUPS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigation.navigate('GroupChat', { groupId: item.id, groupName: item.name })}
          >
            <View style={styles.groupAvatar} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMeta}>{item.members} üye • {item.lastMsg}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  groupAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lavanda,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.metin,
    marginBottom: 2,
  },
  groupMeta: {
    fontSize: 13,
    color: COLORS.metinAcik,
  },
});
