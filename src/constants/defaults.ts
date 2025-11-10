import { TimerSettings, AppSettings } from '../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
  soundEnabled: true,
  vibrationEnabled: true,
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  theme: 'light',
  notificationsEnabled: true,
  remindersEnabled: true,
  timerSettings: DEFAULT_TIMER_SETTINGS,
};

export const STORAGE_KEYS = {
  APP_SETTINGS: '@app_settings',
  STATISTICS: '@statistics',
  SESSIONS: '@sessions',
  CURRENT_SESSION: '@current_session',
  ACHIEVEMENTS: '@achievements',
};

export const AD_UNIT_IDS = {
  // Test IDs de AdMob
  BANNER: __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111'
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  INTERSTITIAL: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  REWARDED: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917'
    : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
};
