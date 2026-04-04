import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../../theme/colors';

/** Tam ekran kök kabı: üst safe area ve arka plan. */
export default function Screen({ children, style }) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.root, { paddingTop: insets.top }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.krem },
});
