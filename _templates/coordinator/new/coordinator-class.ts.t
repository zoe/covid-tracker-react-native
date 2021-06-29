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

export class <%= h.inflection.camelize(h.coordinatorName(name)) %> extends Coordinator {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  screenFlow: Partial<ScreenFlow> = {
    // __HYGEN_INJECT_SCREEN_FLOW_ABOVE__
  } as Partial<ScreenFlow>;

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  startFlow(patientData: PatientData) {
    this.patientData = patientData;
    // Start flow here
    throw new Error("Not implemented.")
  }

  // __HYGEN_INJECT_NAV_METHOD_ABOVE__
}

const <%= h.inflection.camelize(h.coordinatorName(name), true) %> = new <%= h.inflection.camelize(h.coordinatorName(name)) %>();
export default <%= h.inflection.camelize(h.coordinatorName(name), true) %>;
