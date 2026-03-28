import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function NameInputScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Adını yaz..."
          placeholderTextColor="#7A7A7A"
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => navigation.navigate('GoalSelection')}
          disabled={name.trim().length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  input: {
    height: 260,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    borderRadius: 16,
    padding: 20,
    fontSize: 18,
    color: '#3D3D3D',
    backgroundColor: '#FFFFFF',
  },
  bottom: { paddingBottom: 24 },
});
