import { AppCoordinator } from '@covid/features/AppCoordinator';
import { IUserService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { IContentService } from '@covid/core/content/ContentService';
// import { useInjection } from '@covid/provider/services.hooks';
// import { Services } from '@covid/provider/services.types';
import { IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';
import { TDietScoreResponse } from '@covid/core/diet-score/dto/DietScoreResponse';
// const coordinator = dietStudyPlaybackCoordinator;
// const dietScoreService = useInjection<IDietScoreRemoteClient>(Services.DietScore);
// dietScoreService.getDietScore();

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

  signUpToNewsletter() {
    return this.contentService.signUpForDietNewsletter();
  }
}

const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
export default dietStudyPlaybackCoordinator;
