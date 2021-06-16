import { IPatientService } from '@covid/core/patient/PatientService';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';


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

@injectable()
export class ProfileService implements IProfileService {
  @inject(Services.Patient)
  private readonly patientService: IPatientService;

  public async hasMultipleProfiles() {
    try {
      const response = await this.patientService.listProfiles();
      return !!response && response.length > 1;
    } catch (e) {
      return false;
    }
  }
}
