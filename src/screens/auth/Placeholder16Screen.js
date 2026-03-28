import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function Placeholder16Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#3D3D3D" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>İçerik alanı</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('Comparison')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    height: 48,
    alignItems: 'center',
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  placeholder: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { fontSize: 16, color: '#7A7A7A' },
  bottom: { paddingBottom: 24 },
});
