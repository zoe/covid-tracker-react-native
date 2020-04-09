import {AsyncStorage} from "react-native";
import {UserResponse} from "./user/dto/UserAPIContracts";

const AUTH_TOKEN = "authToken";
const USER_ID = "userId";
const USER_COUNT = "userCount";
const USER_COUNTRY = "userCountry";
const CONSENT_SIGNED = "consentSigned";
const PUSH_TOKEN = "pushToken";
const BLOOD_PRESSURE_ANSWER = "hasBloodPressureAnswer";

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
        } catch (err) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
    }

    static async setIsHealthWorker(isHealthWorker: boolean | null) {
        try {
            await AsyncStorage.setItem('isHealthWorker', JSON.stringify(isHealthWorker));
        } catch (err) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
    }

    static async getIsHealthWorker() {
        let healthWorker: string | null = null;
        try {
            healthWorker = await AsyncStorage.getItem('isHealthWorker');
        } catch (e) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }

        if (healthWorker == null)
            return false;
        else {
            return JSON.parse(healthWorker) as boolean;
        }
    }

    static async setPatientDetailsComplete(complete: boolean | null) {
        try {
            await AsyncStorage.setItem('patientDetailsComplete', JSON.stringify(complete));
        } catch (err) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }
    }

    static async hasCompletedPatientDetails() {
        let completedDetails: string | null = null;
        try {
            completedDetails = await AsyncStorage.getItem('patientDetailsComplete');
        } catch (e) {
            // Swallow for now
            // todo: find a way to report the crash and an alternative
        }

        if (completedDetails == null)
            return null;
        else {
            return JSON.parse(completedDetails) as boolean;
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

    // Temp: flag to check we have blood pressure answer
    static async setHasBloodPressureAnswer(hasAnswer: boolean) {
        try {
            await AsyncStorage.setItem(BLOOD_PRESSURE_ANSWER, hasAnswer ? STR_YES : STR_NO)
        } catch (err) {
        }
    }

    static async hasBloodPressureAnswer(): Promise<boolean | null> {
        try {
            const value = await AsyncStorage.getItem(BLOOD_PRESSURE_ANSWER);
            return (value === STR_YES);
        } catch (err) {
            return false;
        }
    }
}
