import { IUserService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { ScreenProps } from '@covid/components/Screen';
import { CallOutType } from '@covid/components/PatientHeader';
import i18n from '@covid/locale/i18n';
import { DietChangedOption } from '@covid/features/diet-study/fields/DietChangedQuestion';
import { PatientData } from '@covid/core/patient/PatientData';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { Coordinator } from '@covid/core/Coordinator';

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
  patientData: PatientData;
  startedFromMenu: boolean;
};

export class DietStudyCoordinator extends Coordinator {
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
        NavigatorService.reset([{ name: homeScreenName() }]);
        NavigatorService.navigate('DietStudyThankYou', this.dietStudyParam);
        return;
      }

      NavigatorService.reset([{ name: homeScreenName() }]);
      NavigatorService.navigate('DietStudyConsent', this.dietStudyParam);
    },
    DietStudyThankYouBreak: () => {
      const { timePeriod } = this.dietStudyParam.dietStudyData;
      if (timePeriod === PRE_LOCKDOWN) {
        NavigatorService.reset([{ name: homeScreenName() }]);
        NavigatorService.navigate('DietStudyAboutYou', this.dietStudyParam);
      } else {
        NavigatorService.reset([{ name: homeScreenName() }]);
        NavigatorService.navigate('DietStudyConsent', this.dietStudyParam);
      }
    },
    DietStudyConsent: () => {
      NavigatorService.navigate('DietStudyThankYouBreak', this.dietStudyParam);
    },
    DietStudyThankYou: () => {
      if (this.dietStudyData.startedFromMenu) {
        NavigatorService.navigate(homeScreenName());
      } else {
        this.appCoordinator.startAssessmentFlow(this.dietStudyData.patientData);
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
          this.appCoordinator.startAssessmentFlow(this.dietStudyData.patientData);
        }
        break;
      }
      case DietStudyConsent.DEFER: {
        Analytics.track(events.DEFER_DIET_STUDY);
        NavigatorService.goBack();
        if (!this.dietStudyData.startedFromMenu) {
          this.appCoordinator.startAssessmentFlow(this.dietStudyData.patientData);
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
}

const dietStudyCoordinator = new DietStudyCoordinator();
export default dietStudyCoordinator;
