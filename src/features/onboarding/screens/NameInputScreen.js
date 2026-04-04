import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useOnboardingData } from '../context/OnboardingDataContext';

export default function NameInputScreen({ navigation }) {
  const { setDisplayName } = useOnboardingData();
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.title}>Adınız ne?</Text>
        <Text style={styles.subtitle}>Sizi tanımak istiyoruz</Text>
      </View>

      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={name}
        onChangeText={setName}
        placeholder="Adınızı yazın..."
        placeholderTextColor="#7A7A7A"
        multiline={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <View style={styles.spacer} />

      <View style={styles.bottom}>
        <PrimaryButton
          title="İlerle"
          onPress={() => {
            setDisplayName(name.trim());
            navigation.navigate('GoalSelection');
          }}
          disabled={name.trim().length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  top: {
    alignItems: 'center',
    marginTop: '15%',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0E5',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#3D3D3D',
    marginHorizontal: 20,
    marginTop: 32,
  },
  inputFocused: {
    borderColor: '#C066A0',
  },
  spacer: { flex: 1 },
  bottom: { marginBottom: 40 },
});
