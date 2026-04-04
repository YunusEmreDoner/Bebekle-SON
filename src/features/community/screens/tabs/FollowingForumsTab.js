import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';

const FORUMS = [
  { id: '1', name: 'Hamilelik Forumu', postId: 'p1', postText: 'Mide bulantısı için ne yapıyorsunuz?' },
  { id: '2', name: 'Doğum Forumu', postId: 'p2', postText: 'Normal doğum deneyimleriniz?' },
];

export default function FollowingForumsTab() {
  const navigation = useNavigation();
  const [following, setFollowing] = useState({});

  const toggleFollow = (id) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={FORUMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFollowing = following[item.id];
          return (
            <View style={styles.forumGroup}>
              <View style={styles.forumHeader}>
                <TouchableOpacity
                  style={styles.forumNameWrapper}
                  onPress={() => navigation.navigate('ForumDetail', { forumId: item.id })}
                >
                  <Text style={styles.forumName}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.followBtn, isFollowing && styles.followingBtn]}
                  onPress={() => toggleFollow(item.id)}
                >
                  <Text style={[styles.followText, isFollowing && styles.followingText]}>
                    {isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.post}
                onPress={() => navigation.navigate('PostDetail', { postId: item.postId })}
              >
                <Text style={styles.postText}>{item.postText}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  forumGroup: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
    marginBottom: 8,
  },
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  forumNameWrapper: {
    flex: 1,
  },
  forumName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.mor,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.mor,
    backgroundColor: COLORS.mor,
  },
  followingBtn: {
    backgroundColor: 'transparent',
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.beyaz,
  },
  followingText: {
    color: COLORS.mor,
  },
  post: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  postText: {
    color: COLORS.metin,
    fontSize: 14,
  },
});
