import { AppCoordinator } from '@covid/features/AppCoordinator';
import { IUserService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { IContentService } from '@covid/core/content/ContentService';

class DietStudyPlaybackCoordinator extends Coordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  contentService: IContentService;

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

  init = (appCoordinator: AppCoordinator, patientData: PatientData, contentService: IContentService) => {
    this.appCoordinator = appCoordinator;
    this.contentService = contentService;
    this.patientData = patientData;
  };

  startDietStudyPlayback = async () => {
    NavigatorService.navigate('DietStudyPlaybackIntro');
  };

  signUpToNewsletter() {
    this.contentService.signUpForDietNewsletter();
  }
}

const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
export default dietStudyPlaybackCoordinator;
