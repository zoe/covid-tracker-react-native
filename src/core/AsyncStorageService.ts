import { AsyncStorage } from 'react-native';

import { migrateIfNeeded } from '@covid/utils/async-storage-migrate';

import { AuthenticatedUser } from './user/UserService';

const AUTH_TOKEN = 'authToken';
const USER_ID = 'userId';
const ASKED_TO_RATE_STATUS = 'askedToRateStatus';
const USER_COUNT = 'userCount';
const USER_COUNTRY = 'userCountry';
const CONSENT_SIGNED = 'consentSigned';
const PUSH_TOKEN = 'pushToken';
const DIET_STUDY_CONSENT = 'dietStudyConsent';

const ASKED_COUNTRY = 'askedCountry';
const ASKED_TO_REPORT_FOR_OTHERS = 'askedToReportForOthers';

export const PERSONALISED_LOCAL_DATA = 'personalisedLocalData';
export const DISMISSED_CALLOUTS = 'dismissedCallouts';

export type PersonalisedLocalData = {
  mapUrl: string;
  mapConfig?: Coordinates;
  lad: string;
  name: string;
  cases: number;
  appUsers: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export class AsyncStorageService {
  public static async GetStoredData(): Promise<AuthenticatedUser | null> {
    await migrateIfNeeded();
    let userToken: string | null = '';
    let userId: string | null = '';
    try {
      userToken = await AsyncStorage.getItem(AUTH_TOKEN);
      userId = await AsyncStorage.getItem(USER_ID);
    } catch (e) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }
    if (!userToken || !userId) {
      return null;
    }
    return { userToken, userId };
  }

  static async storeData(authToken: string, userId: string) {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN, authToken);
      await AsyncStorage.setItem(USER_ID, userId);
    } catch (err) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }
  }

  static async clearData() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN);
      await AsyncStorage.removeItem(USER_ID);
      await AsyncStorage.removeItem(DIET_STUDY_CONSENT);
      await AsyncStorage.removeItem(DISMISSED_CALLOUTS);
    } catch (err) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }
  }

  static async setAskedCountryConfirmation(askedCountry: boolean) {
    try {
      await AsyncStorage.setItem(ASKED_COUNTRY, JSON.stringify(askedCountry));
    } catch (err) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }
  }

  static async getAskedCountryConfirmation() {
    let askedCountry: string | null = null;
    try {
      askedCountry = await AsyncStorage.getItem(ASKED_COUNTRY);
    } catch (e) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }

    if (askedCountry == null) return false;
    else {
      return JSON.parse(askedCountry) as boolean;
    }
  }

  static async getAskedToReportForOthers() {
    try {
      return await AsyncStorage.getItem(ASKED_TO_REPORT_FOR_OTHERS);
    } catch (err) {
      return null;
    }
  }

  static async setAskedToReportForOthers(count: string) {
    try {
      await AsyncStorage.setItem(ASKED_TO_REPORT_FOR_OTHERS, count);
    } catch (err) {}
  }

  static async getAskedToRateStatus() {
    try {
      return await AsyncStorage.getItem(ASKED_TO_RATE_STATUS);
    } catch (err) {
      return null;
    }
  }

  static async setAskedToRateStatus(status: string) {
    try {
      await AsyncStorage.setItem(ASKED_TO_RATE_STATUS, status);
    } catch (err) {}
  }

  static async setUserCount(userCount: string) {
    try {
      await AsyncStorage.setItem(USER_COUNT, userCount);
    } catch (err) {}
  }

  static async getUserCount() {
    try {
      return await AsyncStorage.getItem(USER_COUNT);
    } catch (err) {
      return null;
    }
  }

  static async setUserCountry(countryCode: string) {
    try {
      await AsyncStorage.setItem(USER_COUNTRY, countryCode);
    } catch (err) {}
  }

  static async getUserCountry() {
    try {
      return await AsyncStorage.getItem(USER_COUNTRY);
    } catch (err) {
      return null;
    }
  }

  static async getConsentSigned() {
    try {
      return await AsyncStorage.getItem(CONSENT_SIGNED);
    } catch (err) {
      return null;
    }
  }

  static async setConsentSigned(consent: string) {
    try {
      await AsyncStorage.setItem(CONSENT_SIGNED, consent);
    } catch (err) {}
  }

  static async setPushToken(pushToken: string) {
    try {
      await AsyncStorage.setItem(PUSH_TOKEN, pushToken);
    } catch (err) {}
  }

  static async getPushToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(PUSH_TOKEN);
    } catch (err) {
      return null;
    }
  }

  // Common
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value as T | null;
    } catch (err) {
      return null;
    }
  }

  static async setItem(item: string, key: string): Promise<void> {
    try {
      return await AsyncStorage.setItem(key, item);
    } catch (err) {}
  }
}
