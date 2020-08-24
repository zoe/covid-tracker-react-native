import { injectable, inject } from 'inversify';

import { Services } from '@covid/provider/services.types';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { cleanIntegerVal } from '@covid/utils/number';
import { IPatientService } from '@covid/core/patient/PatientService';

const MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT = 3;

export interface IProfileService {
  hasMultipleProfiles(): Promise<boolean>;
  shouldAskToReportForOthers(): Promise<boolean>;
  recordAskedToReportForOther(): Promise<void>;
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

  public async shouldAskToReportForOthers() {
    try {
      const response = await AsyncStorageService.getAskedToReportForOthers();
      if (response) {
        return cleanIntegerVal(response) < MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT;
      } else {
        await AsyncStorageService.setAskedToReportForOthers('0');
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  public async recordAskedToReportForOther() {
    const response = await AsyncStorageService.getAskedToReportForOthers();
    if (response) {
      const value = cleanIntegerVal(response) + 1;
      await AsyncStorageService.setAskedToReportForOthers(value.toString());
    } else {
      await AsyncStorageService.setAskedToReportForOthers('0');
    }
  }
}
