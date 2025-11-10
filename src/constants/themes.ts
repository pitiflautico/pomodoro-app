import { Theme } from '../types';

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#FF7B7B', // Coral pink from design
    background: '#FEFCFC', // Very light pink/white
    card: '#FFFFFF',
    text: '#2D2D2D',
    textSecondary: '#8E8E93',
    border: '#F0F0F0',
    notification: '#FF7B7B',
    error: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FFA726',
    work: '#FF7B7B', // Coral pink for work
    shortBreak: '#4CAF50', // Green for short break
    longBreak: '#42A5F5', // Blue for long break
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FF9999', // Lighter coral for dark mode
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    notification: '#FF9999',
    error: '#FF6B6B',
    success: '#66D9A5',
    warning: '#FFB74D',
    work: '#FF9999',
    shortBreak: '#66D9A5',
    longBreak: '#64B5F6',
  },
};
