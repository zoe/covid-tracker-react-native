import { ApiClientBase } from "./ApiClientBase";
import {
    AreaStatsResponse,
    AssessmentInfosRequest,
    AssessmentResponse,
    Consent,
    LoginOrRegisterResponse,
    PatientInfosRequest,
    PiiRequest, StartupInfo,
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
import { getInitialPatientState, PatientStateType, PatientProfile } from "../patient/PatientState";
import { AvatarName } from "../../utils/avatar";
import moment from "moment";

const ASSESSMENT_VERSION = '1.3.0'; // TODO: Wire this to something automatic.
const PATIENT_VERSION = '1.3.0';    // TODO: Wire this to something automatic.
const MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT = 3

export default class UserService extends ApiClientBase {
    public static userCountry = 'en-US';
    public static ipCountry = "";
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

    public async listPatients() {
        return this.client.get(`/patient_list/`)
    }

    public async createPatient(infos: Partial<PatientInfosRequest>) {
          infos = {
            ...infos,
            version: this.getPatientVersion()
        };
        return this.client.post(`/patients/`, infos);
    }

    public async updatePatient(patientId: string, infos: Partial<PatientInfosRequest>) {
        infos = {
            ...infos,
            version: this.getPatientVersion()
        };
        return this.client.patch(`/patients/${patientId}/`, infos);
    }

    private getPatientVersion() {
        return PATIENT_VERSION;
    }

    public async getPatient(patientId: string): Promise<PatientInfosRequest> {
        // TODO: Cache this in AsyncStorage?
        const patientResponse = await this.client.get<PatientInfosRequest>(`/patients/${patientId}/`);
        return patientResponse.data;
    }

    public updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest) {
        // Calculate the flags based on patient info
        const isFemale = (patient.gender == 0);
        const isHealthWorker = (
            ["yes_does_treat", "yes_does_interact"].includes(patient.healthcare_professional)
            || patient.is_carer_for_community
        );
        const hasBloodPressureAnswer = (
            patient.takes_any_blood_pressure_medications === true
            || patient.takes_any_blood_pressure_medications === false
        );
        const hasCompletePatientDetails = (
            // They've done at least one page of the patient flow. That's a start.
            !!patient.profile_attributes_updated_at
            // If they've completed the last page, heart disease will either be true or false
            // and not null. (or any nullable field on the last page)
            && (patient.has_heart_disease === true || patient.has_heart_disease === false)
        );

        const profile: PatientProfile = {
            name: patient.name || "Me",
            avatarName: (patient.avatar_name || "profile1") as AvatarName,
            isPrimaryPatient: !patient.reported_by_another,
        };
        const isReportedByAnother = patient.reported_by_another || false;
        const isSameHousehold = patient.same_household_as_reporter || false;

        // Last asked level_of_isolation a week or more ago, or never asked
        const lastAskedLevelOfIsolation = patient.last_asked_level_of_isolation;
        let shouldAskLevelOfIsolation = !lastAskedLevelOfIsolation;
        if (lastAskedLevelOfIsolation) {
            let lastAsked = moment(lastAskedLevelOfIsolation);
            shouldAskLevelOfIsolation = lastAsked.diff(moment(), 'days') >= 7
        }

        return {
            ...patientState,
            profile,
            isFemale,
            isHealthWorker,
            hasBloodPressureAnswer,
            hasCompletePatientDetails,
            isReportedByAnother,
            isSameHousehold,
            shouldAskLevelOfIsolation,
        };
    }

    public async getCurrentPatient(patientId: string, patient?: PatientInfosRequest): Promise<PatientStateType> {
        let currentPatient = getInitialPatientState(patientId);

        try {
            if (!patient) {
                patient = await this.getPatient(patientId);
            }

            if (patient) {
                currentPatient = this.updatePatientState(currentPatient, patient);
            }

        } catch (error) {
            // Something wrong with the request, fallback to defaults
        }

        return currentPatient;
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

    public async getAskedToRateStatus() {
        return AsyncStorageService.getAskedToRateStatus();
    }

    public setAskedToRateStatus(status: string) {
        AsyncStorageService.setAskedToRateStatus(status);
    }


    public async updatePii(pii: Partial<PiiRequest>) {
        const userId = ApiClientBase.userId;
        return this.client.patch(`/information/${userId}/`, pii);
    }

    public async addAssessment(assessment: Partial<AssessmentInfosRequest>) {
        assessment = {
            ...assessment,
            version: this.getAssessmentVersion()
        };
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

    async getConsentSigned(): Promise<Consent | null> {
        let consent: string | null = await AsyncStorageService.getConsentSigned();
        return consent ? JSON.parse(consent) : null
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

    async getStartupInfo() {
        const response = await this.client.get<StartupInfo>('/users/startup_info/');
        UserService.ipCountry = response.data.ip_country;
        await AsyncStorageService.setUserCount(response.data.users_count.toString());
    }


    async setUserCountry(countryCode: string) {
        UserService.userCountry = countryCode;
        i18n.locale = UserService.userCountry;
        await AsyncStorageService.setUserCountry(countryCode);
    }

    async getUserCountry() {
        let localCountry = await AsyncStorageService.getUserCountry();
        if (localCountry != null) {
            if (localCountry == 'GB' || localCountry == 'US') { // Fixes issue with previously only storing partial country code. Can be removed in future.
                localCountry = 'en-' + localCountry;
                await this.setUserCountry(localCountry)
            } else {
                UserService.userCountry = localCountry;
                i18n.locale = UserService.userCountry
            }
        }
        return localCountry;
    }

    async shouldAskCountryConfirmation() {
        if (await AsyncStorageService.getAskedCountryConfirmation()) {
            return false
        } else {
            return UserService.userCountry != UserService.ipCountry
        }
    }

    async defaultCountryToLocale() {
        const locale = () => {
            if (Localization.locale == 'en-GB') {
                return "en-GB";
            } else if (Localization.locale == 'sv-SE') {
                return "sv-SE";
            } else {
                return "en-US";
            }
        };

        await this.setUserCountry(locale());
    }

    async deleteLocalUserData() {
        ApiClientBase.unsetToken();
        await AsyncStorageService.clearData();
        await AsyncStorageService.saveProfile(null);
        this.setConsentSigned("","","");
    }

    async deleteRemoteUserData() {
        const profile = await AsyncStorageService.getProfile();
        const payload = {
            username: profile?.username,
        };
        return this.client.delete(`/users/delete/`, {
            data: payload
        });
    }

    public async getAreaStats(patientId: string) {
        return this.client.get<AreaStatsResponse>(`/area_stats/?patient=${patientId}`);
    }

    public async hasMultipleProfiles() {
        try {
            let response = await this.listPatients();
            return response.data.length > 1
        } catch (e) {
            return false
        }
    }

    public async shouldAskToReportForOthers() {
        try {
            let response = await AsyncStorageService.getAskedToReportForOthers();
            if (response) {
                return parseInt(response) < MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT;
            } else {
                await AsyncStorageService.setAskedToReportForOthers("0");
                return true
            }
        } catch (e) {
            return false;
        }
    }

    public async recordAskedToReportForOther() {
        let response = await AsyncStorageService.getAskedToReportForOthers()
        if (response) {
            const value = parseInt(response) + 1;
            await AsyncStorageService.setAskedToReportForOthers(value.toString())
        } else {
            await AsyncStorageService.setAskedToReportForOthers("0")
        }
    }
}

export const isUSLocale = () => UserService.userCountry === 'en-US';
export const isGBLocale = () => UserService.userCountry === 'en-GB';
export const isSVLocale = () => UserService.userCountry === 'sv-SE';

