export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TimerSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  cyclesBeforeLongBreak: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface Session {
  id: string;
  mode: TimerMode;
  duration: number; // in seconds
  completedAt: Date;
  completed: boolean;
}

export interface Statistics {
  totalSessions: number;
  totalWorkTime: number; // in seconds
  totalBreakTime: number; // in seconds
  sessionsPerDay: { [date: string]: number };
  consecutiveDays: number;
  lastSessionDate: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  remindersEnabled: boolean;
  timerSettings: TimerSettings;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    warning: string;
    work: string;
    shortBreak: string;
    longBreak: string;
  };
};
