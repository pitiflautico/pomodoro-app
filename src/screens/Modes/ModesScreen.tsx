import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTimer } from '../../contexts/TimerContext';
import Card from '../../components/Card';
import { TimerMode } from '../../types';

const ModesScreen = () => {
  const { theme } = useTheme();
  const { currentMode, switchMode, cyclesCompleted, settings } = useTimer();

  const modes: Array<{ mode: TimerMode; title: string; icon: string; description: string }> = [
    {
      mode: 'work',
      title: 'Work Session',
      icon: '🎯',
      description: `Focus for ${settings.workDuration} minutes`,
    },
    {
      mode: 'shortBreak',
      title: 'Short Break',
      icon: '☕',
      description: `Rest for ${settings.shortBreakDuration} minutes`,
    },
    {
      mode: 'longBreak',
      title: 'Long Break',
      icon: '🌟',
      description: `Relax for ${settings.longBreakDuration} minutes`,
    },
  ];

  const getModeColor = (mode: TimerMode) => {
    switch (mode) {
      case 'work':
        return theme.colors.work;
      case 'shortBreak':
        return theme.colors.shortBreak;
      case 'longBreak':
        return theme.colors.longBreak;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Select Mode</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Completed cycles: {cyclesCompleted} / {settings.cyclesBeforeLongBreak}
        </Text>
      </View>

      <View style={styles.cycleIndicator}>
        {Array.from({ length: settings.cyclesBeforeLongBreak }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.cycleCircle,
              {
                backgroundColor:
                  index < cyclesCompleted ? theme.colors.work : theme.colors.border,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.modesContainer}>
        {modes.map((modeItem) => (
          <TouchableOpacity
            key={modeItem.mode}
            onPress={() => switchMode(modeItem.mode)}
            activeOpacity={0.8}
          >
            <Card
              style={[
                styles.modeCard,
                currentMode === modeItem.mode && {
                  borderColor: getModeColor(modeItem.mode),
                  borderWidth: 3,
                },
              ]}
            >
              <View style={styles.modeContent}>
                <Text style={styles.modeIcon}>{modeItem.icon}</Text>
                <View style={styles.modeTextContainer}>
                  <Text style={[styles.modeTitle, { color: theme.colors.text }]}>
                    {modeItem.title}
                  </Text>
                  <Text style={[styles.modeDescription, { color: theme.colors.textSecondary }]}>
                    {modeItem.description}
                  </Text>
                </View>
                {currentMode === modeItem.mode && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: getModeColor(modeItem.mode) },
                    ]}
                  >
                    <Text style={styles.activeText}>Active</Text>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
          How Pomodoro Works
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          1. Work for {settings.workDuration} minutes with full focus{'\n'}
          2. Take a {settings.shortBreakDuration}-minute break{'\n'}
          3. After {settings.cyclesBeforeLongBreak} cycles, take a {settings.longBreakDuration}
          -minute long break{'\n'}
          4. Repeat to stay productive!
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  cycleIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  cycleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  modesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  modeCard: {
    padding: 20,
  },
  modeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
  },
  activeIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoCard: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
});

export default ModesScreen;
