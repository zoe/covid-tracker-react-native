import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import { ConsentService, IConsentService } from '@covid/core/consent/ConsentService';
import { ContentApiClient, IContentApiClient } from '@covid/core/content/ContentApiClient';
import ContentService, { IContentService } from '@covid/core/content/ContentService';
import { IPredictiveMetricsClient, PredictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { DietScoreApiClient, IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';
import { ILocalisationService, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { IPatientService, PatientService } from '@covid/core/patient/PatientService';
import { IProfileService, ProfileService } from '@covid/core/profile/ProfileService';
import { ISchoolService, SchoolService } from '@covid/core/schools/SchoolService';
import CovidTestService, { ICovidTestService } from '@covid/core/user/CovidTestService';
import UserService, { IUserService } from '@covid/core/user/UserService';
import { IVaccineRemoteClient, VaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';
import { IVaccineService, VaccineService } from '@covid/core/vaccine/VaccineService';
import { Services } from '@covid/provider/services.types';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

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
