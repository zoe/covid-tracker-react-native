import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';

import { AsyncStorageService } from '../AsyncStorageService';

import { IDietStudyRemoteClient } from './DietStudyApiClient';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};
type DietStudyParam = { dietStudyData: DietStudyData };

export const CURRENT_DIET_STUDY_TIME_PERIOD = 'July 2020';
export const PREVIOUS_DIET_STUDY_TIME_PERIOD = 'Feb 2020';

export enum DietStudyConsent {
  ACCEPTED = 'accepted',
  DEFER = 'defer',
  SKIP = 'skip',
}

export type DietStudyData = {
  timePeriod?: string;
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
      // Delete recent diet study id before starting the previous one
      // delete dietStudyCoordinator.dietStudyData.recentDietStudyId;

      // if (!!recentDietStudyId && formData.hasDietChanged === DietChangedOption.YES) {
      //   return appCoordinator.startDietStudyFlow(currentPatient, PREVIOUS_DIET_STUDY_TIME_PERIOD);
      // }

      // // Delete deb diet's study id and go to thank you screen
      // delete dietStudyCoordinator.dietStudyData.febDietStudyId;

      // dietStudyCoordinator.gotoNextScreen(route.name);

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

  async dietStudyResponse(response: DietStudyConsent) {
    await AsyncStorageService.setDietStudyConsent(response);
    switch (response) {
      case DietStudyConsent.ACCEPTED: {
        Analytics.track(events.ACCEPT_DIET_STUDY);
        NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
        break;
      }
      case DietStudyConsent.SKIP: {
        Analytics.track(events.DECLINE_DIET_STUDY);
        NavigatorService.goBack();
        break;
      }
      case DietStudyConsent.DEFER: {
        Analytics.track(events.DEFER_DIET_STUDY);
        NavigatorService.goBack();
        break;
      }
    }
  }

  startDietStudy = async () => {
    if (this.dietStudyParam.dietStudyData.timePeriod === PREVIOUS_DIET_STUDY_TIME_PERIOD) {
      return NavigatorService.reset([{ name: 'DietStudyAboutYou', params: this.dietStudyParam }]);
    }

    // Check has user already completed diet studies
    const studies = await this.dietStudyService.getDietStudies();
    if (studies.length > 1) {
      NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
    } else {
      NavigatorService.navigate('DietStudyIntro', this.dietStudyParam);
    }
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
