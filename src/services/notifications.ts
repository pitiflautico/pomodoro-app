import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { TimerMode } from '../types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return true;
  }

  async scheduleTimerCompleteNotification(mode: TimerMode): Promise<void> {
    const messages = {
      work: {
        title: '🎯 Work Session Complete!',
        body: 'Great job! Time for a break.',
      },
      shortBreak: {
        title: '☕ Break Complete!',
        body: 'Ready to get back to work?',
      },
      longBreak: {
        title: '🌟 Long Break Complete!',
        body: 'Refreshed and ready for a new cycle!',
      },
    };

    await Notifications.scheduleNotificationAsync({
      content: messages[mode],
      trigger: null, // Immediate
    });
  }

  async scheduleReminderNotification(title: string, body: string, seconds: number): Promise<string> {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        seconds,
      },
    });

    return id;
  }

  async cancelNotification(id: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}

export default new NotificationService();
