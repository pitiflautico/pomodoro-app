import { Theme } from '../types';

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#6366f1',
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    notification: '#ef4444',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    work: '#ef4444', // Red for work
    shortBreak: '#10b981', // Green for short break
    longBreak: '#3b82f6', // Blue for long break
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#818cf8',
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    border: '#374151',
    notification: '#f87171',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    work: '#f87171',
    shortBreak: '#34d399',
    longBreak: '#60a5fa',
  },
};
