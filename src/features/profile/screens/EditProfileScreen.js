import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../theme/colors';

const SELECTED_COLOR = '#C066A0';

export default function EditProfileScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Account Details */}
      <Text style={styles.sectionTitle}>Account Details</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.placeholder}>Hesap bilgileri burada gösterilecek</Text>
      </View>
      <View style={styles.divider} />

      {/* User Details */}
      <Text style={styles.sectionTitle}>User Details</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Boy (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Örn: 165"
          placeholderTextColor={COLORS.metinAcik}
        />

        <Text style={styles.label}>Kilo (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Örn: 60"
          placeholderTextColor={COLORS.metinAcik}
        />

        <Text style={styles.label}>Cinsiyet</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === 'male' && styles.genderCardSelected,
            ]}
            onPress={() => setGender('male')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="male"
              size={44}
              color={gender === 'male' ? SELECTED_COLOR : COLORS.metinAcik}
            />
            <Text
              style={[
                styles.genderLabel,
                gender === 'male' && styles.genderLabelSelected,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === 'female' && styles.genderCardSelected,
            ]}
            onPress={() => setGender('female')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="female"
              size={44}
              color={gender === 'female' ? SELECTED_COLOR : COLORS.metinAcik}
            />
            <Text
              style={[
                styles.genderLabel,
                gender === 'female' && styles.genderLabelSelected,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beyaz,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.metin,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  placeholder: {
    fontSize: 14,
    color: COLORS.metinAcik,
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.metin,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: COLORS.metin,
    backgroundColor: COLORS.acikGri,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  genderCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.acikGri,
  },
  genderCardSelected: {
    borderColor: SELECTED_COLOR,
    backgroundColor: '#FAF0F6',
  },
  genderLabel: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.metinAcik,
  },
  genderLabelSelected: {
    color: SELECTED_COLOR,
  },
});
