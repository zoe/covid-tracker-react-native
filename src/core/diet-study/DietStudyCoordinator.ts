import { PatientStateType } from '@covid/core/patient/PatientState';
import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { ScreenProps } from '@covid/components/Screen';
import { CallOutType } from '@covid/components/PatientHeader';
import i18n from '@covid/locale/i18n';
import { DietChangedOption } from '@covid/features/diet-study/fields/DietChangedQuestion';

import { AsyncStorageService } from '../AsyncStorageService';

import { IDietStudyRemoteClient } from './DietStudyApiClient';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};
type DietStudyParam = { dietStudyData: DietStudyData };

export const LAST_4_WEEKS = 'Recent 4 weeks';
export const PRE_LOCKDOWN = 'Feb 2020';

export const getScreenHeaderOptions = (timePeriod?: string): Partial<ScreenProps> => {
  if (timePeriod === LAST_4_WEEKS) {
    return {
      calloutType: CallOutType.Tag,
      calloutTitle: i18n.t('diet-study.answer-for-last-4-weeks'),
    };
  } else {
    return {
      calloutType: CallOutType.Tag,
      calloutTitle: i18n.t('diet-study.answer-for-feb'),
    };
  }
};

export enum DietStudyConsent {
  ACCEPTED = 'accepted',
  DEFER = 'defer',
  SKIP = 'skip',
}

export type DietStudyData = {
  timePeriod: string;
  recentDietStudyId?: string;
  febDietStudyId?: string;
  currentPatient: PatientStateType;
  startedFromMenu: boolean;
};

export class DietStudyCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
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
      const { timePeriod } = this.dietStudyParam.dietStudyData;

      if (!timePeriod) {
        NavigatorService.reset([{ name: this.appCoordinator.homeScreenName }]);
        NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
        return;
      }

      NavigatorService.reset([{ name: this.appCoordinator.homeScreenName }]);
      NavigatorService.navigate('DietStudyConsent', this.dietStudyParam);
    },
    DietStudyThankYouBreak: () => {
      const { timePeriod } = this.dietStudyParam.dietStudyData;
      if (timePeriod === PRE_LOCKDOWN) {
        NavigatorService.reset([{ name: this.appCoordinator.homeScreenName }]);
        NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
      } else {
        NavigatorService.reset([{ name: this.appCoordinator.homeScreenName }]);
        NavigatorService.navigate('DietStudyConsent', this.dietStudyParam);
      }
    },
    DietStudyConsent: () => {
      NavigatorService.navigate('DietStudyThankYouBreak', this.dietStudyParam);
    },
    DietStudyThankYou: () => {
      if (this.dietStudyData.startedFromMenu) {
        NavigatorService.navigate(this.appCoordinator.homeScreenName);
      } else {
        this.appCoordinator.startAssessmentFlow(this.dietStudyData.currentPatient);
      }
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    dietStudyData: DietStudyData,
    userService: IUserService,
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
        if (!this.dietStudyData.startedFromMenu) {
          this.appCoordinator.startAssessmentFlow(this.dietStudyData.currentPatient);
        }
        break;
      }
      case DietStudyConsent.DEFER: {
        Analytics.track(events.DEFER_DIET_STUDY);
        NavigatorService.goBack();
        if (!this.dietStudyData.startedFromMenu) {
          this.appCoordinator.startAssessmentFlow(this.dietStudyData.currentPatient);
        }
        break;
      }
    }
  }

  startDietStudy = async () => {
    // Check has user already completed diet studies
    const studies = await this.dietStudyService.getDietStudies();
    const completedDietStudies = studies.filter((item) => item.is_complete);

    if (completedDietStudies.length === 0) {
      // No completed studies - Start from the beginning
      NavigatorService.navigate('DietStudyIntro', this.dietStudyParam);
    } else if (completedDietStudies.length === 1) {
      if (completedDietStudies[0].has_diet_changed === DietChangedOption.NO) {
        // One Completed Study - but said their Diet hasn't changed -> Finish
        NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
      } else {
        // One Completed Study - but their diet may have changed -> Start from PreLockdown
        this.dietStudyParam.dietStudyData.timePeriod = PRE_LOCKDOWN;
        NavigatorService.navigate('DietStudyThankYouBreak', this.dietStudyParam);
      }
    } else {
      NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
    }
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}

const dietStudyCoordinator = new DietStudyCoordinator();
export default dietStudyCoordinator;
