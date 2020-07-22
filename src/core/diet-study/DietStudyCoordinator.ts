import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { ScreenProps } from '@covid/components/Screen';
import { CallOutType } from '@covid/components/PatientHeader';
import i18n from '@covid/locale/i18n';

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
      const { timePeriod } = this.dietStudyParam.dietStudyData;

      if (timePeriod === PRE_LOCKDOWN) {
        NavigatorService.reset([{ name: 'WelcomeRepeat' }]);
        NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
      } else {
        NavigatorService.reset([{ name: 'WelcomeRepeat' }]);
        NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
      }
    },
    DietStudyThankYou: () => {
      if (this.dietStudyData.startedFromMenu) {
        NavigatorService.navigate('WelcomeRepeat');
      } else {
        this.appCoordinator.startAssessmentFlow(this.dietStudyData.currentPatient);
      }
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
    const recentStudies = studies.filter((item) => item.display_name === LAST_4_WEEKS);
    if (recentStudies.length > 0) {
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
