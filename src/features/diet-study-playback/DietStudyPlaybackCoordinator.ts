import { AppCoordinator } from '@covid/features/AppCoordinator';
import { IUserService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';

class DietStudyPlaybackCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
  patientData: PatientData;

  screenFlow: ScreenFlow = {
    DietStudyPlaybackIntro: () => {
      //NavigatorService.navigate('DietStudyYourLifestyle');
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
