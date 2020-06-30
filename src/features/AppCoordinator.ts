import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isGBCountry, isUSCountry, ICoreService } from '@covid/core/user/UserService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import { IContentService } from '@covid/core/content/ContentService';

import { ScreenParamList } from './ScreenParamList';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

// Various route parameters
type PatientIdParamType = { patientId: string };
type CurrentPatientParamType = { currentPatient: PatientStateType };
type ConsentView = { viewOnly: boolean };
type ProfileParamType = { profile: Profile };
type ProfileIdType = { profileId: string };
type RouteParamsType = PatientIdParamType | CurrentPatientParamType | ConsentView | ProfileParamType | ProfileIdType;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export class AppCoordinator {
  @lazyInject(Services.User)
  userService: ICoreService;
  @lazyInject(Services.Content)
  contentService: IContentService;
  navigation: NavigationType;
  patientId: string | null = null;
  currentPatient: PatientStateType;

  screenFlow: ScreenFlow = {
    Splash: () => {
      if (this.patientId) {
        this.navigation.replace('WelcomeRepeat');
      } else {
        this.navigation.replace('Welcome');
      }
    },
    // End of registration flows
    Register: () => {
      const config = appCoordinator.getConfig();

      let askPersonalInfo = config.enablePersonalInformation;
      if (isUSCountry() && UserService.consentSigned.document !== 'US Nurses') {
        askPersonalInfo = false;
      }

      if (askPersonalInfo) {
        this.navigation.replace('OptionalInfo');
      } else if (this.patientId) {
        this.startPatientFlow(this.currentPatient);
      } else {
        console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
      }
    },

    OptionalInfo: () => {
      this.startPatientFlow(this.currentPatient);
    },

    WelcomeRepeat: () => {
      const config = this.getConfig();
      if (config.enableMultiplePatients) {
        this.navigation.navigate('SelectProfile');
      } else {
        this.startAssessmentFlow(this.currentPatient);
      }
    },
  } as ScreenFlow;

  async init(navigation: NavigationType) {
    this.navigation = navigation;
    await this.contentService.getStartupInfo();
    this.patientId = await this.userService.getFirstPatientId();
    this.currentPatient = await this.userService.getCurrentPatient(this.patientId!);
  }

  // Workaround for Expo save/refresh nixing the navigation.
  resetNavigation(navigation: NavigationType) {
    if (!this.navigation) {
      console.log('[ROUTE] Resetting navgation');
    }
    this.navigation = this.navigation || navigation;
  }

  getConfig(): ConfigType {
    return this.userService.getConfig();
  }

  resetToProfileStartAssessment(currentPatient?: PatientStateType) {
    if (!currentPatient) {
      this.navigation.navigate('WelcomeRepeat');
    } else {
      this.navigation.dispatch((state) => {
        const profileScreen = state.routes.find((screen) => {
          return screen.name === 'SelectProfile';
        });

        return CommonActions.navigate({ key: profileScreen!.key });
      });
      this.startAssessmentFlow(currentPatient);
    }
  }

  startPatientFlow(currentPatient: PatientStateType) {
    patientCoordinator.init(this, this.navigation, { currentPatient }, this.userService);
    patientCoordinator.startPatient();
  }

  startAssessmentFlow(currentPatient: PatientStateType) {
    assessmentCoordinator.init(this, this.navigation, { currentPatient }, this.userService, assessmentService);
    assessmentCoordinator.startAssessment();
  }

  async gotoNextScreen(screenName: ScreenName) {
    if (this.screenFlow[screenName]) {
      await this.screenFlow[screenName];
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  }

  gotoScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.navigate(screenName, params);
  }

  async profileSelected(mainProfile: boolean, currentPatient: PatientStateType) {
    if (isGBCountry() && mainProfile && (await this.userService.shouldAskForValidationStudy(false))) {
      this.navigation.navigate('ValidationStudyIntro', { currentPatient });
    } else {
      this.startAssessmentFlow(currentPatient);
    }
  }

  async setPatientId(patientId: string) {
    this.patientId = patientId;
    this.currentPatient = await this.userService.getCurrentPatient(this.patientId!);
  }
}

const appCoordinator = new AppCoordinator();

export default appCoordinator;
