import React, { useEffect, useState } from 'react';
import { StatusBar, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { TimerProvider } from './src/contexts/TimerContext';
import AppNavigator from './src/navigation/AppNavigator';
import NotificationService from './src/services/notifications';
import AdsManager from './src/services/adsManager';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Request notification permissions
      await NotificationService.requestPermissions();

      // Initialize AdMob
      await AdsManager.initialize();

      setIsReady(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsReady(true); // Continue even if initialization fails
    }
  };

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <TimerProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </TimerProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});
