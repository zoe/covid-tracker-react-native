import { AppCoordinator } from '@covid/features/AppCoordinator';
import { IUserService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';

class DietStudyPlaybackCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
  patientData: PatientData;

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

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: IUserService) => {
    this.appCoordinator = appCoordinator;
    this.userService = userService;
    this.patientData = patientData;
  };

  startDietStudyPlayback = async () => {
    NavigatorService.navigate('DietStudyPlaybackIntro');
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}

const dietStudyPlaybackCoordinator = new DietStudyPlaybackCoordinator();
export default dietStudyPlaybackCoordinator;
