import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, Statistics, Session, Achievement } from '../types';
import { DEFAULT_APP_SETTINGS, STORAGE_KEYS } from '../constants/defaults';

class StorageService {
  // App Settings
  async getAppSettings(): Promise<AppSettings> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      return settings ? JSON.parse(settings) : DEFAULT_APP_SETTINGS;
    } catch (error) {
      console.error('Error getting app settings:', error);
      return DEFAULT_APP_SETTINGS;
    }
  }

  async saveAppSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving app settings:', error);
    }
  }

  // Statistics
  async getStatistics(): Promise<Statistics> {
    try {
      const stats = await AsyncStorage.getItem(STORAGE_KEYS.STATISTICS);
      if (stats) {
        return JSON.parse(stats);
      }
      return {
        totalSessions: 0,
        totalWorkTime: 0,
        totalBreakTime: 0,
        sessionsPerDay: {},
        consecutiveDays: 0,
        lastSessionDate: '',
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      return {
        totalSessions: 0,
        totalWorkTime: 0,
        totalBreakTime: 0,
        sessionsPerDay: {},
        consecutiveDays: 0,
        lastSessionDate: '',
      };
    }
  }

  async saveStatistics(stats: Statistics): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving statistics:', error);
    }
  }

  async addSession(session: Session): Promise<void> {
    try {
      const sessions = await this.getSessions();
      sessions.push(session);
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));

      // Update statistics
      const stats = await this.getStatistics();
      stats.totalSessions += 1;

      const dateKey = new Date(session.completedAt).toISOString().split('T')[0];

      if (session.mode === 'work') {
        stats.totalWorkTime += session.duration;
      } else {
        stats.totalBreakTime += session.duration;
      }

      stats.sessionsPerDay[dateKey] = (stats.sessionsPerDay[dateKey] || 0) + 1;

      // Update consecutive days
      const today = new Date().toISOString().split('T')[0];
      if (stats.lastSessionDate) {
        const lastDate = new Date(stats.lastSessionDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          stats.consecutiveDays += 1;
        } else if (diffDays > 1) {
          stats.consecutiveDays = 1;
        }
      } else {
        stats.consecutiveDays = 1;
      }

      stats.lastSessionDate = today;

      await this.saveStatistics(stats);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  }

  async getSessions(): Promise<Session[]> {
    try {
      const sessions = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    try {
      const achievements = await AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (achievements) {
        return JSON.parse(achievements);
      }
      return this.getDefaultAchievements();
    } catch (error) {
      console.error('Error getting achievements:', error);
      return this.getDefaultAchievements();
    }
  }

  async saveAchievements(achievements: Achievement[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }

  private getDefaultAchievements(): Achievement[] {
    return [
      {
        id: '1',
        name: 'First Session',
        description: 'Complete your first Pomodoro session',
        unlocked: false,
        icon: '🎯',
      },
      {
        id: '2',
        name: '10 Sessions',
        description: 'Complete 10 Pomodoro sessions',
        unlocked: false,
        icon: '🔥',
      },
      {
        id: '3',
        name: 'Week Warrior',
        description: 'Work for 7 consecutive days',
        unlocked: false,
        icon: '📅',
      },
      {
        id: '4',
        name: 'Marathon',
        description: 'Complete 50 sessions',
        unlocked: false,
        icon: '🏆',
      },
    ];
  }

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.STATISTICS,
        STORAGE_KEYS.SESSIONS,
        STORAGE_KEYS.ACHIEVEMENTS,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
}

export default new StorageService();
