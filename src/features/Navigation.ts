import { PartialState, NavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '../core/Config';
import { PatientStateType } from '../core/patient/PatientState';
import UserService, { isUSCountry } from '../core/user/UserService';
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

  getThankYouScreenName() {
    return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
  }

  getWelcomeScreenName() {
    return 'Welcome';
  }

  getWelcomeRepeatScreenName() {
    return 'WelcomeRepeat';
  }

  async getStartPatientScreenName(currentPatient: PatientStateType) {
    const config = this.getConfig();
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const page = shouldAskStudy ? 'YourStudy' : 'YourWork';
    return page;
  }

  async gotoStartReport(patientId: string) {
    const config = this.getConfig();
    if (config.enableMultiplePatients) {
      navigator.gotoScreen('SelectProfile', { patientId });
    } else {
      const currentPatient = await this.getCurrentPatient(patientId);
      this.navigation.navigate('StartAssessment', { currentPatient });
    }
  }

  async gotoStartPatient(currentPatient: PatientStateType) {
    const nextPage = await this.getStartPatientScreenName(currentPatient);
    this.gotoScreen(nextPage, { currentPatient });
  }

  async resetToStartPatient(currentPatient: PatientStateType) {
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

  async gotoEndAssessment() {
    const config = this.getConfig();
    const shouldShowReportForOthers =
      config.enableMultiplePatients &&
      !(await this.userService.hasMultipleProfiles()) &&
      (await this.userService.shouldAskToReportForOthers());

    if (shouldShowReportForOthers) {
      this.gotoScreen('ReportForOther');
    } else {
      this.gotoScreen(this.getThankYouScreenName());
    }
  }

  async gotoNextScreen(screenName: ScreenName, params: RouteParamsType) {
    if (ScreenFlow[screenName]) {
      await ScreenFlow[screenName](params);
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  }

  async gotoScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.navigate(screenName, params);
  }

  async replaceScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.replace(screenName, params);
  }

  async resetAndGo(navStack: PartialState<NavigationState>) {
    this.navigation.reset(navStack);
  }
}

const navigator = new Navigator();

const ScreenFlow: any = {
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
      navigator.resetToStartPatient(currentPatient);
    } else {
      // TODO: Warn: missing parameter -- critical error. DO NOT FAIL SILENTLY
      console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
    }
  },

  // End of Personal Information flow
  OptionalInfo: async (routeParams: CurrentPatientParamType) => {
    await navigator.resetToStartPatient(routeParams.currentPatient);
  },

  // Start of reporting flow
  WelcomeRepeat: async (routeParams: PatientIdParamType) => {
    await navigator.gotoStartReport(routeParams.patientId);
  },

  // End of Assessment flows
  HowYouFeel: async () => {
    await navigator.gotoEndAssessment();
  },
  TreatmentOther: async () => {
    await navigator.gotoEndAssessment();
  },
  TreatmentSelection: async () => {
    await navigator.gotoEndAssessment();
  },
  WhereAreYou: async () => {
    await navigator.gotoEndAssessment();
  },
};

export function getLocalThankYou() {
  return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
}

export default navigator;
