import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';

const SAMPLE_COMMENTS = [
  { id: 'c1', user: 'Ayse', text: 'Cok dogru soyluyorsun!' },
  { id: 'c2', user: 'Fatma', text: 'Bende ayni sekilde yasadim.' },
  { id: 'c3', user: 'Zeynep', text: 'Tesekkurler, cok faydali.' },
];

const INITIAL_POSTS = [
  { id: '1', user: 'Kullanıcı 1', text: 'İlk trimester çok zordu...', likes: 12, comments: 3 },
  { id: '2', user: 'Kullanıcı 2', text: 'Bebeğim bu hafta çok aktif!', likes: 24, comments: 7 },
  { id: '3', user: 'Kullanıcı 3', text: 'Doğum sonrası önerileriniz?', likes: 8, comments: 15 },
];

export default function PopularTab() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  const toggleLike = (postId) => {
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p
      )
    );
  };

  const toggleComments = (postId) => {
    setExpandedPost((prev) => (prev === postId ? null : postId));
    setCommentText('');
  };

  const sendComment = (postId) => {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p
      )
    );
    setCommentText('');
  };

  const renderPost = ({ item }) => (
    <View style={styles.postWrapper}>
      <TouchableOpacity
        style={styles.post}
        onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      >
        <Text style={styles.postUser}>{item.user}</Text>
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={likedPosts[item.id] ? 'heart' : 'heart-outline'}
              size={20}
              color={likedPosts[item.id] ? '#E74C3C' : COLORS.metinAcik}
            />
            <Text style={styles.actionCount}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleComments(item.id)}>
            <Ionicons
              name={expandedPost === item.id ? 'chatbubble' : 'chatbubble-outline'}
              size={20}
              color={expandedPost === item.id ? COLORS.mor : COLORS.metinAcik}
            />
            <Text style={styles.actionCount}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {expandedPost === item.id && (
        <View style={styles.commentsSection}>
          {SAMPLE_COMMENTS.map((c) => (
            <View key={c.id} style={styles.commentItem}>
              <Text style={styles.commentUser}>{c.user}</Text>
              <Text style={styles.commentText}>{c.text}</Text>
            </View>
          ))}
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Yorum yaz..."
              placeholderTextColor={COLORS.metinAcik}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => sendComment(item.id)}>
              <Ionicons name="send" size={18} color={COLORS.beyaz} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
      />

      {/* FAB — sol alt, AI butonuyla çakışmasın */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={28} color={COLORS.beyaz} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  postWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  post: {
    padding: 16,
  },
  postUser: {
    fontWeight: '600',
    color: COLORS.mor,
    marginBottom: 4,
  },
  postText: {
    color: COLORS.metin,
    fontSize: 14,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    fontSize: 13,
    color: COLORS.metinAcik,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.acikGri,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 13,
    color: COLORS.metin,
  },
  commentText: {
    fontSize: 13,
    color: COLORS.metin,
    flex: 1,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.metin,
    backgroundColor: COLORS.beyaz,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.mor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#C066A0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
