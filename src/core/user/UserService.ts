import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { camelizeKeys, objectToQueryString } from '@covid/core/api/utils';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { ConsentService, IConsentService } from '@covid/core/consent/ConsentService';
import { UserNotFoundException } from '@covid/core/Exception';
import { ILocalisationService, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';
import { AxiosResponse } from 'axios';
import { inject, injectable, unmanaged } from 'inversify';

import { LoginOrRegisterResponse, PiiRequest, UpdateCountryCodeRequest, UserResponse } from './dto/UserAPIContracts';

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
      password,
      username: email,
    });

    let response: AxiosResponse<LoginOrRegisterResponse>;

    try {
      response = await this.client.post<LoginOrRegisterResponse>('/auth/login/', requestBody, this.configEncoded);
    } catch (e) {
      throw new UserNotFoundException('Invalid login');
    }

    return this.handleLoginOrRegisterResponse(response);
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
    this.client.defaults.headers.Authorization = `Token ${authToken}`;
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
    }
    return response.data;
  };

  private storeTokenInAsyncStorage = async (authToken: any, userId: string) => {
    ApiClientBase.userId = userId;
    if (this.useAsyncStorage) {
      await AsyncStorageService.storeData(authToken, userId);
    }
  };

  public async register(email: string, password: string) {
    const payload = {
      consent_document: ConsentService.consentSigned.document,
      consent_version: ConsentService.consentSigned.version,
      country_code: LocalisationService.userCountry,
      language_code: LocalisationService.getLanguageCode(),
      password1: password,
      password2: password,
      privacy_policy_version: ConsentService.consentSigned.privacy_policy_version,
      username: email,
      version: 2,
    };
    const requestBody = objectToQueryString(payload);

    const response = await this.client.post<LoginOrRegisterResponse>('/auth/signup/', requestBody, this.configEncoded);
    return this.handleLoginOrRegisterResponse(response);
  }

  public async getUser(): Promise<UserResponse | null> {
    try {
      const { data: profile } = await this.client.get<UserResponse>(`/profile/?u=${ApiClientBase.userId}`);
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
    const { userId } = ApiClientBase;
    return this.client.patch(`/information/${userId}/`, pii);
  }

  async deleteRemoteUserData() {
    return this.client.delete(`/users/delete/`);
  }
}

export const userService = new UserService();
