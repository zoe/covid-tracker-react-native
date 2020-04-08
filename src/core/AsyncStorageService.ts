import {AsyncStorage} from "react-native";
import {UserResponse} from "./user/dto/UserAPIContracts";

const AUTH_TOKEN = "authToken";
const USER_ID = "userId";
const USER_COUNT = "userCount";
const USER_COUNTRY = "userCountry";
const CONSENT_SIGNED = "consentSigned";
const PUSH_TOKEN = "pushToken";

const BLOOD_PRESSURE_ANSWER = "hasBloodPressureAnswer";
const IS_HEALTH_WORKER = "isHealthWorker";
const IS_PATIENT_DETAILS_COMPLETE = "patientDetailsComplete"

const STR_YES = "YES";
const STR_NO = "NO";

export class AsyncStorageService {
    public static async GetStoredData() {
        let userToken: string | null = "";
        let userId: string | null = "";
        try {
            userToken = await AsyncStorage.getItem(AUTH_TOKEN);
            userId = await AsyncStorage.getItem(USER_ID);
        } catch (e) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
        return {userToken, userId};
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
            await AsyncStorage.removeItem(BLOOD_PRESSURE_ANSWER);
            await AsyncStorage.removeItem(IS_HEALTH_WORKER);
            await AsyncStorage.removeItem(IS_PATIENT_DETAILS_COMPLETE);
        } catch (err) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
    }

    static async saveProfile(profile: UserResponse | null) {
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
        } catch (err) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
    }

    static async getProfile() {
        let userProfile: string | null = null;
        try {
            userProfile = await AsyncStorage.getItem('userProfile')
        } catch (e) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }

        if (userProfile == null)
            return null;
        else {
            return JSON.parse(userProfile) as UserResponse
        }
    }

    static async setUserCount(userCount: string) {
        try {
            await AsyncStorage.setItem(USER_COUNT, userCount)
        } catch (err) {
            console.log(err)
        }
    }

    static async getUserCount() {
        try {
            return await AsyncStorage.getItem(USER_COUNT);
        } catch (err) {
            return null
        }
    }

    static async setUserCountry(countryCode: string) {
        try {
            await AsyncStorage.setItem(USER_COUNTRY, countryCode)
        } catch (err) {
        }
    }

    static async getUserCountry() {
        try {
            return await AsyncStorage.getItem(USER_COUNTRY);
        } catch (err) {
            return null
        }
    }

    static async getConsentSigned() {
        try {
            return await AsyncStorage.getItem(CONSENT_SIGNED);
        } catch (err) {
            return null
        }
    }

    static async setConsentSigned(consent: string) {
        try {
            await AsyncStorage.setItem(CONSENT_SIGNED, consent);
        } catch (err) {
        }
    }

    static async setPushToken(pushToken: string) {
        try {
            await AsyncStorage.setItem(PUSH_TOKEN, pushToken)
        } catch (err) {
        }
    }

    static async getPushToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(PUSH_TOKEN);
        } catch (err) {
            return null;
        }
    }

}
