import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../contexts/ThemeContext';
import { useTimer } from '../../contexts/TimerContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StorageService from '../../services/storage';
import { TimerSettings } from '../../types';

const CustomizationScreen = () => {
  const { theme } = useTheme();
  const { settings, updateSettings } = useTimer();

  const [workDuration, setWorkDuration] = useState(settings.workDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(
    settings.cyclesBeforeLongBreak
  );
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [vibrationEnabled, setVibrationEnabled] = useState(settings.vibrationEnabled);

  useEffect(() => {
    // Load current settings
    setWorkDuration(settings.workDuration);
    setShortBreakDuration(settings.shortBreakDuration);
    setLongBreakDuration(settings.longBreakDuration);
    setCyclesBeforeLongBreak(settings.cyclesBeforeLongBreak);
    setSoundEnabled(settings.soundEnabled);
    setVibrationEnabled(settings.vibrationEnabled);
  }, [settings]);

  const handleSave = async () => {
    const newSettings: TimerSettings = {
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      cyclesBeforeLongBreak,
      soundEnabled,
      vibrationEnabled,
    };

    // Update context
    updateSettings(newSettings);

    // Save to storage
    const appSettings = await StorageService.getAppSettings();
    appSettings.timerSettings = newSettings;
    await StorageService.saveAppSettings(appSettings);

    Alert.alert('Success', 'Settings saved successfully!');
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset to default settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setWorkDuration(25);
            setShortBreakDuration(5);
            setLongBreakDuration(15);
            setCyclesBeforeLongBreak(4);
            setSoundEnabled(true);
            setVibrationEnabled(true);
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Customize Timer</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Adjust the duration and settings to fit your workflow
        </Text>
      </View>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          ⏱️ Timer Durations
        </Text>

        <View style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Work Duration
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.work }]}>
              {workDuration} min
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={60}
            step={1}
            value={workDuration}
            onValueChange={setWorkDuration}
            minimumTrackTintColor={theme.colors.work}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.work}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Short Break Duration
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.shortBreak }]}>
              {shortBreakDuration} min
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={15}
            step={1}
            value={shortBreakDuration}
            onValueChange={setShortBreakDuration}
            minimumTrackTintColor={theme.colors.shortBreak}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.shortBreak}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Long Break Duration
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.longBreak }]}>
              {longBreakDuration} min
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={45}
            step={5}
            value={longBreakDuration}
            onValueChange={setLongBreakDuration}
            minimumTrackTintColor={theme.colors.longBreak}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.longBreak}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Cycles Before Long Break
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.primary }]}>
              {cyclesBeforeLongBreak}
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={2}
            maximumValue={8}
            step={1}
            value={cyclesBeforeLongBreak}
            onValueChange={setCyclesBeforeLongBreak}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          🔔 Notifications
        </Text>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Sound</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
              Play sound when timer completes
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Vibration</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
              Vibrate when timer completes
            </Text>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSave} size="large" style={styles.saveButton} />
        <Button
          title="Reset to Default"
          onPress={handleReset}
          variant="outline"
          size="large"
          style={styles.resetButton}
        />
      </View>
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
    fontSize: 14,
  },
  card: {
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 24,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleContent: {
    flex: 1,
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    width: '100%',
  },
  resetButton: {
    width: '100%',
  },
});

export default CustomizationScreen;
