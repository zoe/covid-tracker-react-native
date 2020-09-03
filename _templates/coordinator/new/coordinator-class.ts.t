---
to: src/features/<%= feature %>/<%= h.inflection.camelize(h.coordinatorName(name)) %>.ts
---
import { AppCoordinator } from '@covid/features/AppCoordinator';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { lazyInject } from '@covid/provider/services';
import NavigatorService from '@covid/NavigatorService';

export class <%= h.inflection.camelize(h.coordinatorName(name)) %> implements Coordinator {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  screenFlow: ScreenFlow = {
    // __HYGEN_INJECT_SCREEN_FLOW_ABOVE__
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return this.patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
      this.patientData.patientInfo = info;
      return info;
    });
  }

  // __HYGEN_INJECT_NAV_METHOD_ABOVE__
}

const <%= h.inflection.camelize(h.coordinatorName(name), true) %> = new <%= h.inflection.camelize(h.coordinatorName(name)) %>();
export default <%= h.inflection.camelize(h.coordinatorName(name), true) %>;
