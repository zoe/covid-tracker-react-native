import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { Consent } from '@covid/core/user/dto/UserAPIContracts';

type TConsentDocument = 'US' | 'UK' | 'SE' | '' | 'US Nurses' | 'UK Disease Research Consent';

export interface IConsentService {
  postConsent(document: TConsentDocument, version: string, privacy_policy_version: string): void; // TODO: define return object
  getConsentSigned(): Promise<Consent | null>;
  setConsentSigned(document: TConsentDocument, version: string, privacy_policy_version: string): void;
}

export class ConsentService extends ApiClientBase implements IConsentService {
  protected client = ApiClientBase.client;

  public static consentSigned: Consent = {
    document: '',
    privacy_policy_version: '',
    version: '',
  };

  public async postConsent(document: TConsentDocument, version: string, privacy_policy_version: string) {
    const payload = {
      document,
      privacy_policy_version,
      version,
    };
    return this.client.post(`/consent/`, payload);
  }

  async getConsentSigned(): Promise<Consent | null> {
    const consent: string | null = await AsyncStorageService.getConsentSigned();
    return consent ? JSON.parse(consent) : null;
  }

  async setConsentSigned(document: TConsentDocument, version: string, privacy_policy_version: string) {
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
