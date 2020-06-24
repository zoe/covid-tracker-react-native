import { injectable } from 'inversify';

import { Consent } from '../user/dto/UserAPIContracts';
import { ApiClientBase } from '../api/ApiClientBase';
import { AsyncStorageService } from '../AsyncStorageService';

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
    version: '',
    privacy_policy_version: '',
  };

  public async postConsent(document: string, version: string, privacy_policy_version: string) {
    const payload = {
      document,
      version,
      privacy_policy_version,
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
      version,
      privacy_policy_version,
    };
    ConsentService.consentSigned = consent;
    await AsyncStorageService.setConsentSigned(JSON.stringify(consent));
  }
}
