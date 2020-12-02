import { AppCoordinator } from '@covid/features/AppCoordinator';
import { IUserService } from '@covid/core/user/UserService';
import { IDietStudyRemoteClient } from '@covid/core/diet-study/DietStudyApiClient';
import NavigatorService from '@covid/NavigatorService';
import { DietChangedOption } from '@covid/features/diet-study/fields/DietChangedQuestion';
import { DietStudyData, PRE_LOCKDOWN } from '@covid/core/diet-study/DietStudyCoordinator';
import { ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';

class DietStudyPlaybackCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
  //dietStudyService: IDietStudyRemoteClient;
  //dietStudyData: DietStudyData;

  screenFlow: ScreenFlow = {
    DietStudyAboutYou: () => {
      // NavigatorService.navigate('DietStudyYourLifestyle', this.dietStudyParam);
    },
    DietStudyYourLifestyle: () => {
      // NavigatorService.navigate('DietStudyTypicalDiet', this.dietStudyParam);
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    patientData: PatientData,
    // dietStudyData: DietStudyData,
    userService: IUserService
    // dietStudyService: IDietStudyRemoteClient
  ) => {
    this.appCoordinator = appCoordinator;
    //this.dietStudyData = dietStudyData;
    this.userService = userService;
    //this.dietStudyService = dietStudyService;
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
