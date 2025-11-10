import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert, Linking } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StorageService from '../../services/storage';
import AdsManager from '../../services/adsManager';

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await StorageService.getAppSettings();
    setNotificationsEnabled(settings.notificationsEnabled);
    setRemindersEnabled(settings.remindersEnabled);
  };

  const handleNotificationsToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    const settings = await StorageService.getAppSettings();
    settings.notificationsEnabled = value;
    await StorageService.saveAppSettings(settings);
  };

  const handleRemindersToggle = async (value: boolean) => {
    setRemindersEnabled(value);
    const settings = await StorageService.getAppSettings();
    settings.remindersEnabled = value;
    await StorageService.saveAppSettings(settings);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your sessions, statistics, and achievements. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearAllData();
            Alert.alert('Success', 'All data has been cleared');
          },
        },
      ]
    );
  };

  const handleWatchRewardedAd = async () => {
    const shown = await AdsManager.showRewarded();
    if (shown) {
      Alert.alert('Thank You!', 'Thanks for supporting the app!');
    } else {
      Alert.alert('Sorry', 'No ads available right now. Please try again later.');
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      </View>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>🎨 Appearance</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Dark Mode</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
              Switch between light and dark theme
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={isDark ? '#fff' : '#f4f3f4'}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>🔔 Notifications</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Enable Notifications
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
              Get notified when sessions complete
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Auto Reminders
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
              Remind you to start new sessions
            </Text>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={handleRemindersToggle}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={remindersEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>💰 Support</Text>

        <Text style={[styles.supportText, { color: theme.colors.textSecondary }]}>
          This app is completely free and works offline. Watch a rewarded ad to support the
          development!
        </Text>

        <Button
          title="Watch Ad to Support 🎁"
          onPress={handleWatchRewardedAd}
          variant="primary"
          style={styles.adButton}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>⚙️ Data</Text>

        <Button
          title="Clear All Data"
          onPress={handleClearData}
          variant="outline"
          style={styles.clearButton}
        />

        <Text style={[styles.warningText, { color: theme.colors.textSecondary }]}>
          This will permanently delete all your sessions and statistics
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>ℹ️ About</Text>

        <View style={styles.aboutItem}>
          <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>
            App Name
          </Text>
          <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
            Focus Timer - Pomodoro
          </Text>
        </View>

        <View style={styles.aboutItem}>
          <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>Version</Text>
          <Text style={[styles.aboutValue, { color: theme.colors.text }]}>1.0.0</Text>
        </View>

        <View style={styles.aboutItem}>
          <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>
            Description
          </Text>
          <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
            A 100% offline Pomodoro timer to boost your productivity. Focus, take breaks, and track
            your progress.
          </Text>
        </View>

        <View style={styles.aboutItem}>
          <Text style={[styles.aboutLabel, { color: theme.colors.textSecondary }]}>Features</Text>
          <Text style={[styles.aboutValue, { color: theme.colors.text }]}>
            • Fully offline - no internet required{'\n'}
            • Customizable timer durations{'\n'}
            • Statistics and achievements{'\n'}
            • Dark mode support{'\n'}
            • Local notifications
          </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
  },
  supportText: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  adButton: {
    width: '100%',
  },
  clearButton: {
    width: '100%',
    marginBottom: 12,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
  },
  aboutItem: {
    marginBottom: 16,
  },
  aboutLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  aboutValue: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SettingsScreen;
