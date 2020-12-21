import { injectable } from 'inversify';

import { AskForStudies, Consent } from '@covid/core/user/dto/UserAPIContracts';
import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import appConfig from '@covid/appConfig';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';

export interface IConsentService {
  postConsent(document: string, version: string, privacy_policy_version: string): void; // TODO: define return object
  getConsentSigned(): Promise<Consent | null>;
  setConsentSigned(document: string, version: string, privacy_policy_version: string): void;
  setVaccineRegistryResponse(response: boolean): void;
  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean): void;
  setDietStudyResponse(response: boolean): void;
  shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean>;
  shouldShowDietStudy(): Promise<boolean>;
  getStudyStatus(): Promise<AskForStudies>;
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

  setVaccineRegistryResponse(response: boolean) {
    return this.client.post('/study_consent/', {
      study: 'Vaccine Register',
      status: response ? 'signed' : 'declined',
      version: appConfig.vaccineRegistryVersion, // Mandatory field but unused for vaccine registry
      ad_version: appConfig.vaccineRegistryAdVersion,
    });
  }

  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean) {
    return this.client.post('/study_consent/', {
      study: 'UK Validation Study',
      version: appConfig.ukValidationStudyConsentVersion,
      ad_version: appConfig.ukValidationStudyAdVersion,
      status: response ? 'signed' : 'declined',
      allow_future_data_use: anonymizedData,
      allow_contact_by_zoe: reContacted,
    });
  }

  setDietStudyResponse(response: boolean) {
    return this.client.post('/study_consent/', {
      study: 'Diet Study Beyond Covid',
      version: appConfig.dietStudyBeyondCovidConsentVersion,
      status: response ? 'signed' : 'declined',
    });
  }

  async shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean> {
    let url = `/study_consent/status/?consent_version=${appConfig.ukValidationStudyConsentVersion}`;
    if (onThankYouScreen) {
      url += '&thank_you_screen=true';
    }

    const response = await this.client.get<AskForStudies>(url);
    return response.data.should_ask_uk_validation_study;
  }

  async shouldShowDietStudy(): Promise<boolean> {
    // Diet Study is closed
    return Promise.resolve(false);
  }

  private getDefaultStudyResponse(): AskForStudies {
    return {
      should_ask_uk_validation_study: false,
      should_ask_uk_vaccine_register: false,
      should_ask_diet_study: false,
    } as AskForStudies;
  }

  async getStudyStatus(): Promise<AskForStudies> {
    // Sweden has no studies - so short circuit and save a call to server.
    if (isSECountry()) return Promise.resolve(this.getDefaultStudyResponse());

    const url = `/study_consent/status/?home_screen=true`;
    const response = await this.client.get<AskForStudies>(url);
    return response.data;
  }
}
