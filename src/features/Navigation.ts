import { userService } from '@covid/Services';
import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isGBCountry, isSECountry, isUSCountry } from '@covid/core/user/UserService';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import { PartialState, NavigationState, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenParamList } from './ScreenParamList';

type ScreenName = keyof ScreenParamList;

// Various route parameters
type PatientIdParamType = { patientId: string };
type CurrentPatientParamType = { currentPatient: PatientStateType };
type RouteParamsType = PatientIdParamType | CurrentPatientParamType;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

class Navigator {
  navigation: NavigationType;
  userService: UserService;

  ScreenFlow: any = {
    // End of registration flows
    Register: async (routeParams: PatientIdParamType) => {
      const { patientId } = routeParams;
      const config = navigator.getConfig();

      let askPersonalInfo = config.enablePersonalInformation;
      if (isUSCountry() && UserService.consentSigned.document != 'US Nurses') {
        askPersonalInfo = false;
      }

      if (askPersonalInfo) {
        await navigator.replaceScreen('OptionalInfo', { patientId });
      } else if (patientId) {
        const currentPatient = await navigator.getCurrentPatient(patientId);
        navigator.resetToStartPatientDetails(currentPatient);
      } else {
        // TODO: Warn: missing parameter -- critical error. DO NOT FAIL SILENTLY
        console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
      }
    },

    // End of Personal Information flow
    OptionalInfo: async (routeParams: CurrentPatientParamType) => {
      await navigator.resetToStartPatientDetails(routeParams.currentPatient);
    },

    // Start of reporting flow
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

  constructor() {
    this.userService = new UserService();
  }

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
    return await this.userService.getCurrentPatient(patientId);
  }

  getWelcomeRepeatScreenName() {
    return 'WelcomeRepeat';
  }

  getStartPatientScreenName(currentPatient: PatientStateType) {
    const config = this.getConfig();
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const page = shouldAskStudy ? 'YourStudy' : 'YourWork';
    return page;
  }

  resetToProfileStartAssessment(currentPatient: PatientStateType) {
    this.navigation.dispatch((state) => {
      const profileScreen = state.routes.find((screen) => {
        return screen.name == 'SelectProfile';
      });

      return CommonActions.navigate({ key: profileScreen!.key });
    });

    this.startAssessmentFlow(currentPatient);
  }

  async resetToStartPatientDetails(currentPatient: PatientStateType) {
    const patientId = currentPatient.patientId;
    const startPage = navigator.getWelcomeRepeatScreenName();
    const nextPage = await navigator.getStartPatientScreenName(currentPatient);

    // OptionalInfo nav-stack cleanup.
    navigator.resetAndGo({
      index: 0,
      routes: [
        { name: startPage, params: { patientId } },
        { name: nextPage, params: { currentPatient } },
      ],
    });
  }

  startAssessmentFlow(currentPatient: PatientStateType) {
    AssessmentCoordinator.init(this.navigation, { currentPatient }, this.userService);
    AssessmentCoordinator.startAssessment();
  }

  async gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
    if (this.ScreenFlow[screenName]) {
      await this.ScreenFlow[screenName](params);
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

  resetAndGo(navStack: PartialState<NavigationState>) {
    this.navigation.reset(navStack);
  }

  async profileSelected(mainProfile: boolean, currentPatient: PatientStateType) {
    if (isGBCountry() && mainProfile && (await userService.shouldAskForValidationStudy())) {
      this.navigation.navigate('ValidationStudyIntro', { currentPatient });
    } else {
      this.startAssessmentFlow(currentPatient);
    }
  }
}

const navigator = new Navigator();

export default navigator;
