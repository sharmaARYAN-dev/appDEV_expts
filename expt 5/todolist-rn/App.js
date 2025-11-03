import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Home />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
