import { ApiClientBase } from "./ApiClientBase";
import {
    AssessmentInfosRequest,
    AssessmentResponse,
    Consent,
    LoginOrRegisterResponse,
    PatientInfosRequest,
    PiiRequest,
    TokenInfoRequest,
    TokenInfoResponse,
    UserResponse
} from "./dto/UserAPIContracts";
import { UserNotFoundException } from "../Exception";
import { AxiosResponse } from "axios";
import { camelizeKeys } from "./utils";
import { AsyncStorageService } from "../AsyncStorageService";
import * as Localization from 'expo-localization';
import {isAndroid} from "../../components/Screen";
import i18n from "../../locale/i18n"

const ASSESSMENT_VERSION = '1.2.1'; // TODO: Wire this to something automatic.
const PATIENT_VERSION = '1.1.0';    // TODO: Wire this to something automatic.


export default class UserService extends ApiClientBase {
    public static userCountry = 'US';
    public static consentSigned: Consent = {
        document: "",
        version: "",
        privacy_policy_version: "",
    };

    constructor(private useAsyncStorage: boolean = true) {
        super();
    }

    configEncoded = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    private client = ApiClientBase.client;

    public async login(username: string, password: string) {

        const requestBody = this.objectToQueryString({
            username: username,
            password: password
        });

        let response: AxiosResponse<LoginOrRegisterResponse>;

        try {
            response = await this.client.post<LoginOrRegisterResponse>('/auth/login/', requestBody, this.configEncoded);
        } catch (e) {
            throw new UserNotFoundException("Invalid login");
        }

        return await this.handleLoginOrRegisterResponse(response);
    }

    public async resetPassword(email: string) {
        const payload = {
            email: email,
        };
        return this.client.post(`/auth/password/reset/`, payload);
    }

    private handleLoginOrRegisterResponse = async (response: AxiosResponse<LoginOrRegisterResponse>) => {
        const data = this.getData<LoginOrRegisterResponse>(response);
        const authToken = data.key;
        await this.storeTokenInAsyncStorage(authToken, data.user.pii);
        await AsyncStorageService.saveProfile(data.user);
        this.client.defaults.headers['Authorization'] = 'Token ' + authToken;

        return data;
    };

    getData = <T>(response: AxiosResponse<T>) => {

        if (typeof response.data === 'string') {
            return <T>camelizeKeys(JSON.parse(response.data));
        } else {
            return response.data;
        }
    };

    private storeTokenInAsyncStorage = async (authToken: any, userId: string) => {
        ApiClientBase.userId = userId;
        if (this.useAsyncStorage) {
            await AsyncStorageService.storeData(authToken, userId);
        }
    };

    public async register(email: string, password: string) {

        const payload = {
            username: email,
            password1: password,
            password2: password,
            country_code: UserService.userCountry,
            consent_document: UserService.consentSigned.document,
            consent_version: UserService.consentSigned.version,
            privacy_policy_version: UserService.consentSigned.privacy_policy_version,
        };
        const requestBody = this.objectToQueryString(payload);

        // todo: what is in the response?
        const promise = this.client.post<LoginOrRegisterResponse>('/auth/signup/', requestBody, this.configEncoded);
        await promise.then(this.handleLoginOrRegisterResponse);

        return promise;
    }

    public async postConsent(document: string, version: string, privacy_policy_version: string) {
        const payload = {
            document: document,
            version: version,
            privacy_policy_version: privacy_policy_version,
        };
        return this.client.patch(`/consent/`, payload);
    }

    public async updatePatient(patientId: string, infos: Partial<PatientInfosRequest>) {
        infos = {
            ...infos,
            version: this.getPatientVersion()
        }
        return this.client.patch(`/patients/${patientId}/`, infos);
    }

    private getPatientVersion() {
        return PATIENT_VERSION;
    }


    public async getProfile(): Promise<UserResponse> {
        const localProfile = await AsyncStorageService.getProfile();

        // If not stored locally, wait for server response.
        if (localProfile == null) {
            const profileResponse = await this.client.get<UserResponse>(`/profile/`);
            await AsyncStorageService.saveProfile(profileResponse.data);
            return profileResponse.data;
        }

        // If local copy available, use it but update it.
        this.client.get<UserResponse>(`/profile/`).then(async profileResponse => {
            await AsyncStorageService.saveProfile(profileResponse.data);
        });
        return localProfile
    }

    public async updatePii(pii: Partial<PiiRequest>) {
        const userId = ApiClientBase.userId;
        return this.client.patch(`/information/${userId}/`, pii);
    }

    public async addAssessment(assessment: Partial<AssessmentInfosRequest>) {
        assessment = {
            ...assessment,
            version: this.getAssessmentVersion()
        }
        return this.client.post<AssessmentResponse>(`/assessments/`, assessment);
    }

    private getAssessmentVersion() {
        return ASSESSMENT_VERSION;
    }

    public async updateAssessment(assessmentId: string, assessment: Partial<AssessmentInfosRequest>) {
        return this.client.patch<AssessmentResponse>(`/assessments/${assessmentId}/`, assessment);
    }

    public async savePushToken(pushToken: string) {
        const tokenDoc = {
            token: pushToken,
            active: true,
            platform: isAndroid ? 'ANDROID' : 'IOS',
        } as TokenInfoRequest;
        return this.client.post<TokenInfoResponse>(`/tokens/`, tokenDoc);
    }

    public async hasCompletedPatientDetails(patientId: string) {
        const completedLocal = await AsyncStorageService.hasCompletedPatientDetails();
        if (completedLocal != null) {
            return completedLocal
        }

        const patientProfileResponse = await this.client.get<PatientInfosRequest>(`/patients/${patientId}/`);
        if (patientProfileResponse.data.profile_attributes_updated_at == null) {
            return false
        } else {
            await AsyncStorageService.setIsHealthWorker(
                (patientProfileResponse.data.healthcare_professional === "yes_does_treat")
                || patientProfileResponse.data.is_carer_for_community);
            await AsyncStorageService.setPatientDetailsComplete(true);
            return true
        }
    }

    async setConsentSigned(document: string, version: string, privacy_policy_version: string) {
        const consent = {
            document: document,
            version: version,
            privacy_policy_version: privacy_policy_version,
        };
        UserService.consentSigned = consent;
        await AsyncStorageService.setConsentSigned(JSON.stringify(consent));
    }

    async getUserCount() {
        return await AsyncStorageService.getUserCount();
    }

    async setUserCountInAsyncStorage() {
        const userCount = await this.client.get<number>('/users/covid_count/');
        await AsyncStorageService.setUserCount(userCount.data.toString());
    }


    async setUserCountry(countryCode: string) {
        UserService.userCountry = countryCode;
        i18n.locale = "en-" + UserService.userCountry
        await AsyncStorageService.setUserCountry(countryCode);
    }

    async getUserCountry() {
        const localCountry = await AsyncStorageService.getUserCountry();
        if (localCountry != null) {
            UserService.userCountry = localCountry;
            i18n.locale = "en-" + UserService.userCountry
        }
        return localCountry;
    }

    async defaultCountryToLocale() {
        const locale = () => {
            if (Localization.locale == 'en-GB') {
                return "GB";
            } else {
                return "US";
            }
        };

        await this.setUserCountry(locale());
    }

    async isHealthWorker() {
        return AsyncStorageService.getIsHealthWorker()
    }

    async deleteLocalUserData() {
        ApiClientBase.unsetToken();
        await AsyncStorageService.clearData();
        await AsyncStorageService.setIsHealthWorker(false);
        await AsyncStorageService.saveProfile(null);
        await AsyncStorageService.setPatientDetailsComplete(false);
        this.setConsentSigned("","","");
    }

    async deleteRemoteUserData() {
        const profile = await AsyncStorageService.getProfile()
        const payload = {
            username: profile?.username,
        };
        return this.client.delete(`/users/delete/`, {
            data: payload
        });
    }
}

export const isUSLocale = () => UserService.userCountry === 'US';
export const isGBLocale = () => UserService.userCountry === 'GB';

