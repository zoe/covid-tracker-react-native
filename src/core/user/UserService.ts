import { AxiosResponse } from 'axios';
import { injectable, unmanaged, inject } from 'inversify';

import NavigatorService from '@covid/NavigatorService';
import { Services } from '@covid/provider/services.types';

import { AsyncStorageService } from '../AsyncStorageService';
import { UserNotFoundException } from '../Exception';
import { ApiClientBase } from '../api/ApiClientBase';
import { handleServiceError } from '../api/ApiServiceErrors';
import { objectToQueryString, camelizeKeys } from '../api/utils';
import { ConsentService, IConsentService } from '../consent/ConsentService';
import { ILocalisationService, LocalisationService } from '../localisation/LocalisationService';

import { LoginOrRegisterResponse, PiiRequest, UserResponse, UpdateCountryCodeRequest } from './dto/UserAPIContracts';

export type AuthenticatedUser = {
  userToken: string;
  userId: string;
};

export interface IUserService {
  hasUser: boolean;
  register(email: string, password: string): Promise<LoginOrRegisterResponse>; // TODO: define return object
  login(email: string, password: string): Promise<LoginOrRegisterResponse>; // TODO: define return object
  logout(): void;
  resetPassword(email: string): Promise<any>; // TODO: define return object
  getUser(): Promise<UserResponse | null>;
  updateCountryCode(body: UpdateCountryCodeRequest): Promise<any>;
  updatePii(pii: Partial<PiiRequest>): Promise<any>;
  deleteRemoteUserData(): Promise<any>;
  loadUser(): void;
  getFirstPatientId(): Promise<string | null>;
}

@injectable()
export default class UserService extends ApiClientBase implements IUserService {
  @inject(Services.Consent)
  public consentService: IConsentService;

  @inject(Services.Localisation)
  public localisationService: ILocalisationService;

  public hasUser = false;

  constructor(@unmanaged() private useAsyncStorage: boolean = true) {
    super();
  }

  configEncoded = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  protected client = ApiClientBase.client;

  public async login(email: string, password: string) {
    const requestBody = objectToQueryString({
      username: email,
      password,
    });

    let response: AxiosResponse<LoginOrRegisterResponse>;

    try {
      response = await this.client.post<LoginOrRegisterResponse>('/auth/login/', requestBody, this.configEncoded);
    } catch (e) {
      throw new UserNotFoundException('Invalid login');
    }

    return await this.handleLoginOrRegisterResponse(response);
  }

  public async logout() {
    this.hasUser = false;
    await this.deleteLocalUserData();
  }

  private async deleteLocalUserData() {
    ApiClientBase.unsetToken();
    await AsyncStorageService.clearData();
    await this.consentService.setConsentSigned('', '', '');
  }

  public async resetPassword(email: string) {
    const payload = {
      email,
    };
    return this.client.post(`/auth/password/reset/`, payload);
  }

  private handleLoginOrRegisterResponse = async (response: AxiosResponse<LoginOrRegisterResponse>) => {
    const data = this.getData<LoginOrRegisterResponse>(response);
    const authToken = data.key;
    await this.storeTokenInAsyncStorage(authToken, data.user.pii);
    this.client.defaults.headers['Authorization'] = 'Token ' + authToken;
    this.hasUser = true;
    return data;
  };

  async loadUser() {
    const user = await AsyncStorageService.GetStoredData();
    this.hasUser = !!user && !!user!.userToken && !!user!.userId;
    this.localisationService.updateUserCountry(this.hasUser);
    if (this.hasUser) {
      await ApiClientBase.setToken(user!.userToken, user!.userId);
    }
  }

  async getFirstPatientId(): Promise<string | null> {
    try {
      const user = await this.getUser();
      return user!.patients[0];
    } catch (error) {
      return null;
    }
  }

  getData = <T>(response: AxiosResponse<T>) => {
    if (typeof response.data === 'string') {
      return camelizeKeys(JSON.parse(response.data)) as T;
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
      country_code: LocalisationService.userCountry,
      language_code: LocalisationService.getLanguageCode(),
      consent_document: ConsentService.consentSigned.document,
      consent_version: ConsentService.consentSigned.version,
      privacy_policy_version: ConsentService.consentSigned.privacy_policy_version,
    };
    const requestBody = objectToQueryString(payload);

    const response = await this.client.post<LoginOrRegisterResponse>('/auth/signup/', requestBody, this.configEncoded);
    return this.handleLoginOrRegisterResponse(response);
  }

  public async getUser(): Promise<UserResponse | null> {
    try {
      const { data: profile } = await this.client.get<UserResponse>(`/profile/`);
      return profile;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  public async updateCountryCode(body: UpdateCountryCodeRequest): Promise<UserResponse | null> {
    try {
      const { data } = await this.client.patch<UserResponse>(`/users/country_code/`, body);
      return data;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  public async updatePii(pii: Partial<PiiRequest>) {
    const userId = ApiClientBase.userId;
    return this.client.patch(`/information/${userId}/`, pii);
  }

  async deleteRemoteUserData() {
    return this.client.delete(`/users/delete/`);
  }
}
