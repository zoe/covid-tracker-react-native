import { AppCoordinator } from '@covid/features/AppCoordinator';
import { Coordinator } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { IContentService } from '@covid/core/content/ContentService';
import { IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';
import { TDietScoreResponse } from '@covid/core/diet-score/dto/DietScoreResponse';

class DietStudyPlaybackCoordinator extends Coordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  contentService: IContentService;
  dietScore: TDietScoreResponse;

  init = async (
    appCoordinator: AppCoordinator,
    patientData: PatientData,
    contentService: IContentService,
    dietStudyService: IDietScoreRemoteClient,
  ) => {
    this.appCoordinator = appCoordinator;
    this.contentService = contentService;
    this.patientData = patientData;
    this.dietScore = await dietStudyService.getDietScore(patientData.patientId);
  };
}

const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
export default dietStudyPlaybackCoordinator;
