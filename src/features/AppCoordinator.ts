import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { Services } from '@covid/provider/services.types';
import { ConsentService } from '@covid/core/consent/ConsentService';
import { lazyInject } from '@covid/provider/services';
import { IPatientService } from '@covid/core/patient/PatientService';

import { ScreenParamList } from './ScreenParamList';

type ScreenName = keyof ScreenParamList;

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
  private readonly userService: ICoreService;
  
  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  navigation: NavigationType;

  screenFlow: any = {
    // End of registration flows
    Register: async (routeParams: PatientIdParamType) => {
      const { patientId } = routeParams;
      const config = navigator.getConfig();

      let askPersonalInfo = config.enablePersonalInformation;
      if (isUSCountry() && ConsentService.consentSigned.document !== 'US Nurses') {
        askPersonalInfo = false;
      }

      if (askPersonalInfo) {
        await navigator.replaceScreen('OptionalInfo', { patientId });
      } else if (patientId) {
        const currentPatient = await navigator.getCurrentPatient(patientId);
        this.startPatientFlow(currentPatient);
      } else {
        // TODO: Warn: missing parameter -- critical error. DO NOT FAIL SILENTLY
        console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
      }
    },

    OptionalInfo: async (routeParams: CurrentPatientParamType) => {
      this.startPatientFlow(routeParams.currentPatient);
    },

    WelcomeRepeat: async (routeParams: PatientIdParamType) => {
      const config = this.getConfig();
      if (config.enableMultiplePatients) {
        this.gotoScreen('SelectProfile', { patientId: routeParams.patientId });
      } else {
        const currentPatient = await this.getCurrentPatient(routeParams.patientId);
        this.startAssessmentFlow(currentPatient);
      }
    },
  };
  setNavigation(navigation: NavigationType) {
    this.navigation = navigation;
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

  async getCurrentPatient(patientId: string): Promise<PatientStateType> {
    return await this.patientService.getCurrentPatient(patientId);
  }

  getWelcomeRepeatScreenName(): keyof ScreenParamList {
    return 'WelcomeRepeat';
  }

  resetToProfileStartAssessment(currentPatient?: PatientStateType) {
    if (!currentPatient) {
      this.gotoScreen(this.getWelcomeRepeatScreenName());
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

  async gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
    if (this.screenFlow[screenName]) {
      await this.screenFlow[screenName](params);
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  }

  gotoScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.navigate(screenName, params);
  }

  replaceScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.replace(screenName, params);
  }

  async profileSelected(mainProfile: boolean, currentPatient: PatientStateType) {
    if (isGBCountry() && mainProfile && (await this.userService.shouldAskForValidationStudy(false))) {
      this.navigation.navigate('ValidationStudyIntro', { currentPatient });
    } else {
      this.startAssessmentFlow(currentPatient);
    }
  }
}

const navigator = new AppCoordinator();

export default navigator;
