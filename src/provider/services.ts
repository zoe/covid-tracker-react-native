import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { ConsentService, IConsentService } from '@covid/core/consent/ConsentService';
import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import { IContentApiClient, ContentApiClient } from '@covid/core/content/ContentApiClient';
import ContentService, { IContentService } from '@covid/core/content/ContentService';
import UserService, { IUserService } from '@covid/core/user/UserService';
import { LocalisationService, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IPatientService, PatientService } from '@covid/core/patient/PatientService';
import { IProfileService, ProfileService } from '@covid/core/profile/ProfileService';
import CovidTestService, { ICovidTestService } from '@covid/core/user/CovidTestService';
import { IPredictiveMetricsClient, PredictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { Services } from '@covid/provider/services.types';
import { ISchoolService, SchoolService } from '@covid/core/schools/SchoolService';
import { IVaccineService, VaccineService } from '@covid/core/vaccine/VaccineService';
import { IVaccineRemoteClient, VaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';
import { DietScoreApiClient, IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';

export const container = new Container();

container.bind<IApiClient>(Services.Api).to(ApiClient).inSingletonScope();

container.bind<IUserService>(Services.User).to(UserService).inSingletonScope();

container.bind<IContentApiClient>(Services.ContentApi).to(ContentApiClient).inSingletonScope();

container.bind<IContentService>(Services.Content).to(ContentService).inSingletonScope();

container.bind<IConsentService>(Services.Consent).to(ConsentService).inSingletonScope();

container.bind<ILocalisationService>(Services.Localisation).to(LocalisationService).inSingletonScope();

container.bind<IPatientService>(Services.Patient).to(PatientService).inSingletonScope();

container.bind<IProfileService>(Services.Profile).to(ProfileService).inSingletonScope();

container.bind<ICovidTestService>(Services.CovidTest).to(CovidTestService).inSingletonScope();

// School
container.bind<ISchoolService>(Services.SchoolService).to(SchoolService).inSingletonScope();

// DietScores
container.bind<IDietScoreRemoteClient>(Services.DietScore).to(DietScoreApiClient).inRequestScope();

// Incidence Api
container.bind<IApiClient>(Services.IncidenceHttpApi).to(ApiClient).inSingletonScope();
container
  .bind<IPredictiveMetricsClient>(Services.PredictiveMetricsClient)
  .to(PredictiveMetricsClient)
  .inSingletonScope();

/**
 * Vaccine services
 */
container.bind<IVaccineRemoteClient>(Services.VaccineApiClient).to(VaccineApiClient).inSingletonScope();

container.bind<IVaccineService>(Services.Vaccine).to(VaccineService).inSingletonScope();

export const { lazyInject } = getDecorators(container);
