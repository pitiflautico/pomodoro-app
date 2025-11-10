import { TimerMode, TimerStatus, TimerSettings, Session } from '../types';
import { EventEmitter } from 'events';
import StorageService from './storage';

class TimerEngine extends EventEmitter {
  private currentMode: TimerMode = 'work';
  private status: TimerStatus = 'idle';
  private timeRemaining: number = 0; // in seconds
  private intervalId: NodeJS.Timeout | null = null;
  private settings: TimerSettings;
  private cyclesCompleted: number = 0;
  private sessionStartTime: Date | null = null;

  constructor() {
    super();
    this.settings = {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      cyclesBeforeLongBreak: 4,
      soundEnabled: true,
      vibrationEnabled: true,
    };
  }

  async initialize() {
    const appSettings = await StorageService.getAppSettings();
    this.settings = appSettings.timerSettings;
    this.timeRemaining = this.settings.workDuration * 60;
  }

  updateSettings(settings: TimerSettings) {
    this.settings = settings;
    if (this.status === 'idle') {
      this.timeRemaining = this.getDurationForMode(this.currentMode);
    }
  }

  start() {
    if (this.status === 'running') return;

    this.status = 'running';
    if (this.sessionStartTime === null) {
      this.sessionStartTime = new Date();
    }

    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);

    this.emit('statusChanged', this.status);
  }

  pause() {
    if (this.status !== 'running') return;

    this.status = 'paused';
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.emit('statusChanged', this.status);
  }

  reset() {
    this.stop();
    this.timeRemaining = this.getDurationForMode(this.currentMode);
    this.sessionStartTime = null;
    this.emit('timeUpdated', this.timeRemaining);
  }

  stop() {
    this.status = 'idle';
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.sessionStartTime = null;
    this.emit('statusChanged', this.status);
  }

  private tick() {
    if (this.timeRemaining > 0) {
      this.timeRemaining -= 1;
      this.emit('timeUpdated', this.timeRemaining);
    } else {
      this.onTimerComplete();
    }
  }

  private async onTimerComplete() {
    this.stop();

    // Save session
    if (this.sessionStartTime) {
      const session: Session = {
        id: Date.now().toString(),
        mode: this.currentMode,
        duration: this.getDurationForMode(this.currentMode),
        completedAt: new Date(),
        completed: true,
      };

      await StorageService.addSession(session);
    }

    // Emit completion event
    this.emit('timerCompleted', this.currentMode);

    // Determine next mode
    if (this.currentMode === 'work') {
      this.cyclesCompleted += 1;

      if (this.cyclesCompleted >= this.settings.cyclesBeforeLongBreak) {
        this.currentMode = 'longBreak';
        this.cyclesCompleted = 0;
      } else {
        this.currentMode = 'shortBreak';
      }
    } else {
      this.currentMode = 'work';
    }

    this.timeRemaining = this.getDurationForMode(this.currentMode);
    this.sessionStartTime = null;
    this.emit('modeChanged', this.currentMode);
    this.emit('timeUpdated', this.timeRemaining);
  }

  switchMode(mode: TimerMode) {
    this.stop();
    this.currentMode = mode;
    this.timeRemaining = this.getDurationForMode(mode);
    this.sessionStartTime = null;
    this.emit('modeChanged', mode);
    this.emit('timeUpdated', this.timeRemaining);
  }

  private getDurationForMode(mode: TimerMode): number {
    switch (mode) {
      case 'work':
        return this.settings.workDuration * 60;
      case 'shortBreak':
        return this.settings.shortBreakDuration * 60;
      case 'longBreak':
        return this.settings.longBreakDuration * 60;
    }
  }

  getTimeRemaining(): number {
    return this.timeRemaining;
  }

  getCurrentMode(): TimerMode {
    return this.currentMode;
  }

  getStatus(): TimerStatus {
    return this.status;
  }

  getCyclesCompleted(): number {
    return this.cyclesCompleted;
  }

  getSettings(): TimerSettings {
    return this.settings;
  }
}

export default new TimerEngine();
