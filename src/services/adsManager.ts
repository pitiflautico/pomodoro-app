import mobileAds, {
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from '../constants/defaults';

class AdsManager {
  private interstitialAd: InterstitialAd | null = null;
  private rewardedAd: RewardedAd | null = null;
  private interstitialLoaded = false;
  private rewardedLoaded = false;
  private sessionsCount = 0;

  async initialize() {
    try {
      await mobileAds().initialize();
      this.loadInterstitial();
      this.loadRewarded();
    } catch (error) {
      console.error('Error initializing ads:', error);
    }
  }

  private loadInterstitial() {
    this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL);

    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      this.interstitialLoaded = true;
    });

    this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.interstitialLoaded = false;
      // Reload for next time
      this.loadInterstitial();
    });

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial ad error:', error);
      this.interstitialLoaded = false;
    });

    this.interstitialAd.load();
  }

  private loadRewarded() {
    this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED);

    this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      this.rewardedLoaded = true;
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward:', reward);
    });

    this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.rewardedLoaded = false;
      // Reload for next time
      this.loadRewarded();
    });

    this.rewardedAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Rewarded ad error:', error);
      this.rewardedLoaded = false;
    });

    this.rewardedAd.load();
  }

  async showInterstitial(): Promise<boolean> {
    if (this.interstitialLoaded && this.interstitialAd) {
      try {
        await this.interstitialAd.show();
        return true;
      } catch (error) {
        console.error('Error showing interstitial:', error);
        return false;
      }
    }
    return false;
  }

  async showRewarded(): Promise<boolean> {
    if (this.rewardedLoaded && this.rewardedAd) {
      try {
        await this.rewardedAd.show();
        return true;
      } catch (error) {
        console.error('Error showing rewarded ad:', error);
        return false;
      }
    }
    return false;
  }

  onSessionComplete() {
    this.sessionsCount += 1;

    // Show interstitial every 5 sessions
    if (this.sessionsCount % 5 === 0) {
      this.showInterstitial();
    }
  }

  isRewardedReady(): boolean {
    return this.rewardedLoaded;
  }

  isInterstitialReady(): boolean {
    return this.interstitialLoaded;
  }
}

export default new AdsManager();
