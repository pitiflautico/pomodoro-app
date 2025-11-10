import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTimer } from '../../contexts/TimerContext';
import CircularProgress from '../../components/CircularProgress';
import Button from '../../components/Button';
import BannerAd from '../../components/BannerAd';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { timeRemaining, currentMode, status, start, pause, reset, settings } = useTimer();

  const getModeColor = () => {
    switch (currentMode) {
      case 'work':
        return theme.colors.work;
      case 'shortBreak':
        return theme.colors.shortBreak;
      case 'longBreak':
        return theme.colors.longBreak;
      default:
        return theme.colors.primary;
    }
  };

  const getModeText = () => {
    switch (currentMode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getTotalTime = () => {
    switch (currentMode) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - timeRemaining / getTotalTime();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.modeText, { color: getModeColor() }]}>{getModeText()}</Text>
      </View>

      <View style={styles.timerContainer}>
        <CircularProgress progress={progress} color={getModeColor()}>
          <Text style={[styles.timerText, { color: theme.colors.text }]}>
            {formatTime(timeRemaining)}
          </Text>
        </CircularProgress>
      </View>

      <View style={styles.controlsContainer}>
        {status === 'idle' || status === 'paused' ? (
          <Button
            title={status === 'paused' ? 'Resume' : 'Start'}
            onPress={start}
            size="large"
            style={[styles.button, { backgroundColor: getModeColor() }]}
          />
        ) : (
          <Button
            title="Pause"
            onPress={pause}
            size="large"
            variant="outline"
            style={styles.button}
          />
        )}

        {status !== 'idle' && (
          <Button
            title="Reset"
            onPress={reset}
            size="large"
            variant="secondary"
            style={styles.button}
          />
        )}
      </View>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
          {status === 'running' ? '⏰ Timer is running...' : ''}
          {status === 'paused' ? '⏸️ Timer is paused' : ''}
          {status === 'idle' ? '✨ Ready to focus' : ''}
        </Text>
      </View>

      <BannerAd />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  modeText: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timerContainer: {
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
  },
  controlsContainer: {
    width: '100%',
    gap: 12,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
    minHeight: 56,
  },
  statusContainer: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
