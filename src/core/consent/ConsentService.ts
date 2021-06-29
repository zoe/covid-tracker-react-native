import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { Consent } from '@covid/core/user/dto/UserAPIContracts';
import { injectable } from 'inversify';

export interface IConsentService {
  postConsent(document: string, version: string, privacy_policy_version: string): void; // TODO: define return object
  getConsentSigned(): Promise<Consent | null>;
  setConsentSigned(document: string, version: string, privacy_policy_version: string): void;
}

@injectable()
export class ConsentService extends ApiClientBase implements IConsentService {
  protected client = ApiClientBase.client;

  public static consentSigned: Consent = {
    document: '',
    privacy_policy_version: '',
    version: '',
  };

  public async postConsent(document: string, version: string, privacy_policy_version: string) {
    const payload = {
      document,
      privacy_policy_version,
      version,
    };
    return this.client.patch(`/consent/`, payload);
  }

  async getConsentSigned(): Promise<Consent | null> {
    const consent: string | null = await AsyncStorageService.getConsentSigned();
    return consent ? JSON.parse(consent) : null;
  }

  async setConsentSigned(document: string, version: string, privacy_policy_version: string) {
    const consent = {
      document,
      privacy_policy_version,
      version,
    };
    ConsentService.consentSigned = consent;
    await AsyncStorageService.setConsentSigned(JSON.stringify(consent));
  }
}

export const consentService = new ConsentService();
