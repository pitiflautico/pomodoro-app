import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TimerMode, TimerStatus, TimerSettings } from '../types';
import TimerEngine from '../services/timerEngine';
import NotificationService from '../services/notifications';
import SoundManager from '../services/soundManager';
import AdsManager from '../services/adsManager';

interface TimerContextType {
  timeRemaining: number;
  currentMode: TimerMode;
  status: TimerStatus;
  cyclesCompleted: number;
  settings: TimerSettings;
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchMode: (mode: TimerMode) => void;
  updateSettings: (settings: TimerSettings) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentMode, setCurrentMode] = useState<TimerMode>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [settings, setSettings] = useState<TimerSettings>(TimerEngine.getSettings());

  useEffect(() => {
    initializeTimer();

    TimerEngine.on('timeUpdated', handleTimeUpdate);
    TimerEngine.on('statusChanged', handleStatusChange);
    TimerEngine.on('modeChanged', handleModeChange);
    TimerEngine.on('timerCompleted', handleTimerComplete);

    return () => {
      TimerEngine.removeListener('timeUpdated', handleTimeUpdate);
      TimerEngine.removeListener('statusChanged', handleStatusChange);
      TimerEngine.removeListener('modeChanged', handleModeChange);
      TimerEngine.removeListener('timerCompleted', handleTimerComplete);
    };
  }, []);

  const initializeTimer = async () => {
    await TimerEngine.initialize();
    setTimeRemaining(TimerEngine.getTimeRemaining());
    setCurrentMode(TimerEngine.getCurrentMode());
    setStatus(TimerEngine.getStatus());
    setCyclesCompleted(TimerEngine.getCyclesCompleted());
    setSettings(TimerEngine.getSettings());
  };

  const handleTimeUpdate = (time: number) => {
    setTimeRemaining(time);
  };

  const handleStatusChange = (newStatus: TimerStatus) => {
    setStatus(newStatus);
  };

  const handleModeChange = (mode: TimerMode) => {
    setCurrentMode(mode);
    setCyclesCompleted(TimerEngine.getCyclesCompleted());
  };

  const handleTimerComplete = async (mode: TimerMode) => {
    // Play sound and vibrate
    if (settings.soundEnabled) {
      await SoundManager.playCompletionSound();
    }
    if (settings.vibrationEnabled) {
      SoundManager.vibrate();
    }

    // Send notification
    await NotificationService.scheduleTimerCompleteNotification(mode);

    // Show ad
    AdsManager.onSessionComplete();
  };

  const start = () => {
    TimerEngine.start();
  };

  const pause = () => {
    TimerEngine.pause();
  };

  const reset = () => {
    TimerEngine.reset();
  };

  const switchMode = (mode: TimerMode) => {
    TimerEngine.switchMode(mode);
  };

  const updateSettings = (newSettings: TimerSettings) => {
    TimerEngine.updateSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        currentMode,
        status,
        cyclesCompleted,
        settings,
        start,
        pause,
        reset,
        switchMode,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
