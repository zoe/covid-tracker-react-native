import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { DietStudyEvents, events } from '@covid/core/Analytics';

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
  dietStudyService: IDietStudyRemoteClient;
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
    this.dietStudyService = dietStudyService;
  };

  async dietStudyResponse(response: DietStudyEvents) {
    Analytics.track(response);

    switch (response) {
      case DietStudyEvents.ACCEPT_DIET_STUDY: {
        await AsyncStorageService.setSkipDietStudy(false);
        NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
        break;
      }
      case DietStudyEvents.DECLINE_DIET_STUDY: {
        await AsyncStorageService.setSkipDietStudy(true);
        NavigatorService.goBack();
        break;
      }
      case DietStudyEvents.DEFER_DIET_STUDY: {
        NavigatorService.goBack();
        break;
      }
    }
  }

  startDietStudy = async () => {
    // Check has user already completed diet studies
    const studies = await this.dietStudyService.getDietStudies();
    if (studies.length > 1) {
      return NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
    }
    NavigatorService.navigate('DietStudyIntro', this.dietStudyParam);
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
