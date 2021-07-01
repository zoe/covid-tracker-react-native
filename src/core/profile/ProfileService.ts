import { patientService } from '@covid/core/patient/PatientService';

export type Profile = {
  id: string;
  name?: string;
  avatar_name?: string;
  reported_by_another?: boolean;
  report_count?: number;
  last_reported_at?: Date;
  created_at?: Date;
};

export interface IProfileService {
  hasMultipleProfiles(): Promise<boolean>;
}

export class ProfileService implements IProfileService {
  public async hasMultipleProfiles() {
    try {
      const response = await patientService.listProfiles();
      return !!response && response.length > 1;
    } catch (e) {
      return false;
    }
  }
}

export const profileService = new ProfileService();
