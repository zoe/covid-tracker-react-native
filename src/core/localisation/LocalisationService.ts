import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { ConfigType, getCountryConfig } from '@covid/core/Config';
import { ScreenName } from '@covid/core/Coordinator';
import i18n from '@covid/locale/i18n';
import * as Localization from 'expo-localization';

export interface ILocalisationService {
  setUserCountry(countryCode: string): void;
  initCountryConfig(countryCode: string): void;
  getUserCountry(): Promise<string | null>;
  shouldAskCountryConfirmation(): Promise<boolean>;
  defaultCountryFromLocale(): void;
  updateUserCountry(isLoggedIn: boolean): void;
  getConfig(): ConfigType | undefined;
}

export class LocalisationService implements ILocalisationService {
  public static userCountry = 'US';

  public static countryConfig: ConfigType | undefined;

  public static ipCountry = '';

  initCountryConfig(countryCode: string) {
    LocalisationService.countryConfig = getCountryConfig(countryCode);
  }

  getConfig(): ConfigType | undefined {
    return LocalisationService.countryConfig;
  }

  async setUserCountry(countryCode: string) {
    LocalisationService.userCountry = countryCode;
    this.setLocaleFromCountry(countryCode);
    this.initCountryConfig(countryCode);
    await AsyncStorageService.setUserCountry(countryCode);
  }

  async getUserCountry() {
    const country = await AsyncStorageService.getUserCountry();
    if (country) {
      LocalisationService.userCountry = country;
      this.setLocaleFromCountry(country);
    }
    return country;
  }

  setLocaleFromCountry(countryCode: string) {
    let USLocale = 'en';
    if (Localization.locale === 'es-US') {
      USLocale = 'es';
    }

    const localeMap: { [key: string]: string } = {
      GB: 'en',
      SE: 'sv',
      US: USLocale,
    };

    i18n.locale = `${localeMap[countryCode]}-${LocalisationService.userCountry}`;
  }

  async updateUserCountry(isLoggedIn: boolean) {
    const country: string | null = await this.getUserCountry();
    this.initCountryConfig(country ?? 'GB');
    if (isLoggedIn) {
      // If logged in with no country default to GB as this will handle all
      // GB users before selector was included.
      if (country === null) {
        await this.setUserCountry('GB');
      }
    } else {
      await this.defaultCountryFromLocale();
    }
  }

  async defaultCountryFromLocale() {
    const country = () => {
      if (Localization.locale === 'en-GB') {
        return 'GB';
      }
      if (Localization.locale === 'sv-SE') {
        return 'SE';
      }
      return 'US';
    };

    await this.setUserCountry(country());
  }

  async shouldAskCountryConfirmation() {
    if (await AsyncStorageService.getAskedCountryConfirmation()) {
      return false;
    }
    return LocalisationService.userCountry !== LocalisationService.ipCountry;
  }

  static getLanguageCode() {
    return i18n.locale.split('-')[0];
  }

  static getLocale() {
    return i18n.locale;
  }
}

export const homeScreenName = (): ScreenName => {
  return isGBCountry() ? 'Dashboard' : isUSCountry() ? 'DashboardUS' : 'WelcomeRepeat';
};

export const thankYouScreenName = (): ScreenName => {
  return isUSCountry() ? 'ThankYouUS' : isSECountry() ? 'ThankYouSE' : 'ThankYouUK';
};

export const isUSCountry = () => LocalisationService.userCountry === 'US';
export const isGBCountry = () => LocalisationService.userCountry === 'GB';
export const isSECountry = () => LocalisationService.userCountry === 'SE';

export const localisationService = new LocalisationService();
