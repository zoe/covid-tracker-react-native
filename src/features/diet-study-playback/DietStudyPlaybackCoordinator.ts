import { IContentService } from '@covid/core/content/ContentService';
import { Coordinator } from '@covid/core/Coordinator';
import { IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';
import { TDietScoreResponse } from '@covid/core/diet-score/dto/DietScoreResponse';
import { PatientData } from '@covid/core/patient/PatientData';
import { AppCoordinator } from '@covid/features/AppCoordinator';

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

export const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
