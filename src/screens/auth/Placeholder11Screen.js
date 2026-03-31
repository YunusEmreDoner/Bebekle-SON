import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function Placeholder11Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content} />
      <View style={styles.bottom}>
        <PrimaryButton title="İlerle" onPress={() => navigation.navigate('DateMethod')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF6F0' },
  content: { flex: 1, paddingHorizontal: 20 },
  bottom: { marginBottom: 40 },
});
