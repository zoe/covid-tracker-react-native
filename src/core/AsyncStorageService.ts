import { AsyncStorage } from 'react-native';

import { UserResponse } from './user/dto/UserAPIContracts';
import { AuthenticatedUser } from './user/UserService';

const AUTH_TOKEN = 'authToken';
const USER_ID = 'userId';
const ASKED_TO_RATE_STATUS = 'askedToRateStatus';
const USER_COUNT = 'userCount';
const USER_COUNTRY = 'userCountry';
const CONSENT_SIGNED = 'consentSigned';
const PUSH_TOKEN = 'pushToken';

const USER_PROFILE = 'userProfile';
const ASKED_COUNTRY = 'askedCountry';

const ASKED_TO_REPORT_FOR_OTHERS = 'askedToReportForOthers';

export class AsyncStorageService {
  public static async GetStoredData(): Promise<AuthenticatedUser | null> {
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

  static async saveProfile(profile: UserResponse | null) {
    try {
      await AsyncStorage.setItem(USER_PROFILE, JSON.stringify(profile));
    } catch (err) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }
  }

  static async getProfile() {
    let userProfile: string | null = null;
    try {
      userProfile = await AsyncStorage.getItem(USER_PROFILE);
    } catch (e) {
      // Swallow for now
      // todo: find a way to report the crash and an alternative
    }

    if (userProfile == null) return null;
    else {
      return JSON.parse(userProfile) as UserResponse;
    }
  }

  static async getAskedToReportForOthers() {
    try {
      return await AsyncStorage.getItem(ASKED_TO_REPORT_FOR_OTHERS);
    } catch (err) {
      return null;
    }
  }

  static setAskedToReportForOthers(count: string) {
    try {
      AsyncStorage.setItem(ASKED_TO_REPORT_FOR_OTHERS, count);
    } catch (err) {}
  }

  static async getAskedToRateStatus() {
    try {
      return await AsyncStorage.getItem(ASKED_TO_RATE_STATUS);
    } catch (err) {
      return null;
    }
  }

  static setAskedToRateStatus(status: string) {
    try {
      AsyncStorage.setItem(ASKED_TO_RATE_STATUS, status);
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
}
