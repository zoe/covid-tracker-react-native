import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { IContentService } from '@covid/core/content/ContentService';
import { IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';
import { TDietScoreResponse } from '@covid/core/diet-score/dto/DietScoreResponse';

class DietStudyPlaybackCoordinator extends Coordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  contentService: IContentService;
  dietScoreSevice: IDietScoreRemoteClient;
  dietScore: TDietScoreResponse;

  screenFlow: ScreenFlow = {
    DietStudyPlaybackIntro: () => {
      NavigatorService.navigate('DietStudyPlaybackGlobal');
    },
    DietStudyPlaybackGlobal: () => {
      NavigatorService.navigate('DietStudyPlaybackDietQuality');
    },
    DietStudyPlaybackDietQuality: () => {
      NavigatorService.navigate('DietStudyPlaybackYourDiet');
    },
    DietStudyPlaybackYourDiet: () => {
      NavigatorService.navigate('DietStudyPlaybackGutHealth');
    },
    DietStudyPlaybackGutHealth: () => {
      NavigatorService.navigate('DietStudyPlaybackYourGut');
    },
    DietStudyPlaybackYourGut: () => {
      NavigatorService.navigate('DietStudyPlaybackResearch');
    },
    DietStudyPlaybackResearch: () => {
      NavigatorService.navigate(homeScreenName());
    },
  } as ScreenFlow;

  init = async (
    appCoordinator: AppCoordinator,
    patientData: PatientData,
    contentService: IContentService,
    dietStudyService: IDietScoreRemoteClient
  ) => {
    this.appCoordinator = appCoordinator;
    this.contentService = contentService;
    this.patientData = patientData;
    this.dietScore = await dietStudyService.getDietScore(patientData.patientId);
  };

  startDietStudyPlayback = async () => {
    NavigatorService.navigate('DietStudyPlaybackIntro');
  };

  signUpToNewsletter(signup: boolean) {
    return this.contentService.signUpForDietNewsletter(signup);
  }
}

const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
export default dietStudyPlaybackCoordinator;
