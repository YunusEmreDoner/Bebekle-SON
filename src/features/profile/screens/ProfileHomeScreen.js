import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image, Modal, Pressable, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../../theme/colors';

const MENU_ITEMS = [
  { id: 'EditProfile', label: 'View Profile', icon: 'person-outline' },
  { id: 'Experience', label: 'Your Experience', icon: 'heart-outline' },
  { id: 'EditBaby', label: 'Edit Baby', icon: 'happy-outline' },
  { id: 'Settings', label: 'Settings', icon: 'settings-outline' },
  { id: 'Reminders', label: 'Reminders', icon: 'alarm-outline' },
  { id: 'PartnerConnection', label: 'Partner Connection', icon: 'people-outline' },
  { id: 'Privacy', label: 'Privacy', icon: 'lock-closed-outline' },
  { id: 'Help', label: 'Help', icon: 'help-circle-outline' },
  { id: 'Legal', label: 'Legal Links', icon: 'document-text-outline' },
];

const AVATARS = [
  '#C066A0', '#9B5CC4', '#D4C5F0', '#F2C4CE', '#4ECDC4', '#FF6B6B', '#45B7D1', '#96CEB4',
];

export default function ProfileHomeScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage({ type: 'uri', value: result.assets[0].uri });
      setModalVisible(false);
    }
  };

  const selectAvatar = (color) => {
    setProfileImage({ type: 'avatar', value: color });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.avatarWrapper}>
              {profileImage?.type === 'uri' ? (
                <Image source={{ uri: profileImage.value }} style={styles.avatarCircle} />
              ) : profileImage?.type === 'avatar' ? (
                <View style={[styles.avatarCircle, { backgroundColor: profileImage.value }]} />
              ) : (
                <View style={styles.avatarCircle} />
              )}
              <TouchableOpacity style={styles.editBadge} onPress={() => setModalVisible(true)}>
                <Ionicons name="pencil" size={14} color={COLORS.beyaz} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Profil</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.id)}
          >
            <Ionicons name={item.icon} size={22} color={COLORS.mor} style={styles.icon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.metinAcik} />
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profil Fotoğrafı</Text>

            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Ionicons name="camera-outline" size={22} color={COLORS.mor} />
              <Text style={styles.modalOptionText}>Fotoğraf Çek / Galeriden Seç</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.modalSubtitle}>Avatarlardan Seç</Text>
            <View style={styles.avatarGrid}>
              {AVATARS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.avatarOption, { backgroundColor: color }]}
                  onPress={() => selectAvatar(color)}
                />
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.acikGri,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.mor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.beyaz,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.metin,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  icon: {
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: COLORS.metin,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.beyaz,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.metin,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: COLORS.acikGri,
    borderRadius: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.metin,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.metinAcik,
    marginBottom: 12,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
