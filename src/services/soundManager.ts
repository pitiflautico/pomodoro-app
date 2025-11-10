import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

class SoundManager {
  private sound: Audio.Sound | null = null;

  async playCompletionSound() {
    try {
      // Create a simple beep sound using Audio
      const { sound } = await Audio.Sound.createAsync(
        // We'll use a system sound or you can add custom sound files
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3' },
        { shouldPlay: true }
      );
      this.sound = sound;

      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  vibrate(pattern: number[] = [0, 500, 200, 500]) {
    try {
      Vibration.vibrate(pattern);
    } catch (error) {
      console.error('Error vibrating:', error);
    }
  }

  async cleanup() {
    if (this.sound) {
      await this.sound.unloadAsync();
    }
  }
}

export default new SoundManager();
