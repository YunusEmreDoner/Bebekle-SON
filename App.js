import React from 'react';
import AppProviders from './src/core/providers/AppProviders';
import RootNavigator from './src/core/navigation/RootNavigator';

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
