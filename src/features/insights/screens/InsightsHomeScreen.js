import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from '../../../components/features/insights/SectionHeader';
import FeaturedCard from '../../../components/features/insights/FeaturedCard';
import ContentCard from '../../../components/features/insights/ContentCard';
import NewsCard from '../../../components/features/insights/NewsCard';
import DoctorCommentCard from '../../../components/features/insights/DoctorCommentCard';
import TipCard from '../../../components/features/insights/TipCard';

const CATEGORIES = ['Tümü', 'Onedio-like', 'News', 'Articles', 'Doc Pro', 'Tips'];

const ONEDIO_DATA = [
  { id: '1', title: 'Hamilelik bilgini test et!', tag: 'Quiz', sub: '10 soru', bg: '#F2C4CE' },
  { id: '2', title: 'Bebeğin ilk hareketleri ne zaman?', tag: 'Info', sub: '3 dk okuma', bg: '#D4C5F0' },
  { id: '3', title: 'Web içerik örneği', tag: null, sub: '4 dk okuma', bg: '#F2C4CE' },
];

const NEWS_DATA = [
  {
    id: '1',
    category: 'Web News',
    categoryColor: '#C066A0',
    title: 'Yeni doğan taramaları hakkında bilmeniz gerekenler',
    time: '2 saat önce',
    thumbColor: '#D4C5F0',
  },
  {
    id: '2',
    category: 'App-in News',
    categoryColor: '#9B5CC4',
    title: 'Bu hafta bebeğiniz ne kadar büyüdü?',
    time: 'Bugün',
    thumbColor: '#F2C4CE',
  },
];

const TIPS_DATA = [
  {
    id: '1',
    icon: 'bulb-outline',
    iconColor: '#C066A0',
    iconBg: '#F2C4CE',
    title: 'Günün ipucu',
    description: 'Bol su için! Günde en az 8 bardak su hamilelikte çok önemli.',
  },
  {
    id: '2',
    icon: 'leaf-outline',
    iconColor: '#9B5CC4',
    iconBg: '#D4C5F0',
    title: 'Beslenme ipucu',
    description: 'Demir açısından zengin gıdalar tüketmeyi ihmal etmeyin.',
  },
];

export default function InsightsHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(0);
  const show = (idx) => activeCategory === 0 || activeCategory === idx;

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      {/* ─── HEADER ─── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>B</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insights</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Bookmarks')}>
            <Ionicons name="bookmark-outline" size={22} color="#3D3D3D" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color="#3D3D3D" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ─── SEARCH BAR ─── */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#7A7A7A" />
          <TextInput
            style={styles.searchInput}
            placeholder="İçeriklerde ara..."
            placeholderTextColor="#7A7A7A"
            editable={false}
          />
        </View>

        {/* ─── CATEGORY PILLS ─── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pills}
        >
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, activeCategory === i && styles.pillActive]}
              onPress={() => setActiveCategory(i)}
            >
              <Text style={[styles.pillText, activeCategory === i && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ─── FEATURED ─── */}
        <FeaturedCard onPress={() => navigation.navigate('Articles')} />

        {/* ─── ONEDIO-LIKE ─── */}
        {show(1) && (
          <>
            <SectionHeader
              title="Onedio-like content"
              onSeeAll={() => navigation.navigate('OnedioContent')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {ONEDIO_DATA.map((item) => (
                <ContentCard
                  key={item.id}
                  title={item.title}
                  tag={item.tag}
                  sub={item.sub}
                  bgColor={item.bg}
                  onPress={() => navigation.navigate('AppInContent')}
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* ─── NEWS ─── */}
        {show(2) && (
          <>
            <SectionHeader
              title="News"
              onSeeAll={() => navigation.navigate('News')}
            />
            <View style={styles.section}>
              {NEWS_DATA.map((item) => (
                <NewsCard
                  key={item.id}
                  category={item.category}
                  categoryColor={item.categoryColor}
                  title={item.title}
                  time={item.time}
                  thumbColor={item.thumbColor}
                  onPress={() => navigation.navigate('News')}
                />
              ))}
            </View>
          </>
        )}

        {/* ─── ARTICLES ─── */}
        {show(3) && (
          <>
            <SectionHeader
              title="Articles"
              onSeeAll={() => navigation.navigate('Articles')}
            />
            <View style={styles.section}>
              <NewsCard
                category=""
                title="Doğum öncesi egzersizler: Güvenli hareket rehberi"
                time="8 dk okuma"
                thumbColor="#D4C5F0"
                onPress={() => navigation.navigate('Articles')}
              />
            </View>
          </>
        )}

        {/* ─── DOC PRO COMMENTS ─── */}
        {show(4) && (
          <>
            <SectionHeader
              title="Doc Pro comments"
              onSeeAll={() => navigation.navigate('DocProComments')}
            />
            <View style={styles.section}>
              <DoctorCommentCard
                name="Dr. Ayşe Yılmaz"
                specialty="Kadın Doğum Uzmanı"
                comment="İlk trimesterde folik asit takviyesi bebeğin sinir sistemi gelişimi için kritik öneme sahiptir."
                onPress={() => navigation.navigate('DocProComments')}
              />
            </View>
          </>
        )}

        {/* ─── TIPS ─── */}
        {show(5) && (
          <>
            <SectionHeader
              title="Tips"
              onSeeAll={() => navigation.navigate('FloTips')}
            />
            <View style={styles.section}>
              {TIPS_DATA.map((tip) => (
                <TipCard
                  key={tip.id}
                  icon={tip.icon}
                  iconColor={tip.iconColor}
                  iconBg={tip.iconBg}
                  title={tip.title}
                  description={tip.description}
                  onPress={() => navigation.navigate('FloTips')}
                />
              ))}
            </View>
          </>
        )}

        <View style={{ paddingBottom: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#FDF6F0',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4C5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9B5CC4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3D3D',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    padding: 4,
  },
  /* ── Scroll ── */
  scroll: {
    flex: 1,
  },
  /* ── Search ── */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#3D3D3D',
    padding: 0,
  },
  /* ── Category Pills ── */
  pills: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 12,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E8E0E5',
  },
  pillActive: {
    backgroundColor: '#C066A0',
    borderColor: '#C066A0',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  /* ── Horizontal List ── */
  horizontalList: {
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 8,
    paddingBottom: 16,
  },
  /* ── Sections ── */
  section: {
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 8,
  },
});
