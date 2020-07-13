import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';

import { AsyncStorageService } from '../AsyncStorageService';
import { IDietStudyRemoteClient } from './DietStudyApiClient';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};
type DietStudyParam = { dietStudyData: DietStudyData };

export type DietStudyData = {
  recentDietStudyId?: string;
  febDietStudyId?: string;
  currentPatient: PatientStateType;
};

export class DietStudyCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: ICoreService;
  dietStudyData: DietStudyData;

  get dietStudyParam(): DietStudyParam {
    return { dietStudyData: this.dietStudyData };
  }

  screenFlow: ScreenFlow = {
    DietStudyAboutYou: () => {
      NavigatorService.navigate('DietStudyYourLifestyle', this.dietStudyParam);
    },
    DietStudyYourLifestyle: () => {
      NavigatorService.navigate('DietStudyTypicalDiet', this.dietStudyParam);
    },
    DietStudyTypicalDiet: () => {
      NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
    },
    DietStudyThankYou: () => {
      NavigatorService.navigate('WelcomeRepeat');
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    dietStudyData: DietStudyData,
    userService: ICoreService,
    dietStudyService: IDietStudyRemoteClient
  ) => {
    this.appCoordinator = appCoordinator;
    this.dietStudyData = dietStudyData;
    this.userService = userService;
  };

  startDietStudy = async () => {
    const shouldSkip = await AsyncStorageService.getSkipDietStudy();
    // If skip is null, user has not answered.
    // If skip is false, user is opted in .
    if (!shouldSkip) {
      return NavigatorService.navigate('DietStudyIntro', this.dietStudyParam);
    }
    NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  async showProfiles() {
    return this.userService.getConfig().enableMultiplePatients && (await this.userService.hasMultipleProfiles());
  }
  async listPatients() {
    return this.userService.listPatients();
  }
}

const dietStudyCoordinator = new DietStudyCoordinator();
export default dietStudyCoordinator;
