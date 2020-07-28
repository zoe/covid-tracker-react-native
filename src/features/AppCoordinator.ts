import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { ICoreService, isGBCountry, isUSCountry } from '@covid/core/user/UserService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import { IContentService } from '@covid/core/content/ContentService';
import { IDietStudyRemoteClient } from '@covid/core/diet-study/DietStudyApiClient';
import dietStudyCoordinator, { DietStudyConsent, LAST_4_WEEKS } from '@covid/core/diet-study/DietStudyCoordinator';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { Profile } from '@covid/components/Collections/ProfileList';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

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
type RouteParamsType = PatientIdParamType | CurrentPatientParamType | ConsentView | ProfileParamType | ProfileIdType; //TODO Can be used for passing params to goToNextScreen

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export class AppCoordinator {
  @lazyInject(Services.User)
  userService: ICoreService;
  @lazyInject(Services.Content)
  contentService: IContentService;
  @lazyInject(Services.DietStudy)
  dietStudyService: IDietStudyRemoteClient;
  patientId: string | null = null;
  currentPatient: PatientStateType;

  screenFlow: ScreenFlow = {
    Splash: () => {
      if (this.patientId) {
        NavigatorService.replace('WelcomeRepeat');
      } else {
        NavigatorService.replace('Welcome');
      }
    },
    Login: () => {
      NavigatorService.reset([{ name: 'WelcomeRepeat' }]);
    },
    Register: () => {
      const config = appCoordinator.getConfig();

      let askPersonalInfo = config.enablePersonalInformation;
      if (isUSCountry() && UserService.consentSigned.document !== 'US Nurses') {
        askPersonalInfo = false;
      }

      if (askPersonalInfo) {
        NavigatorService.replace('OptionalInfo');
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
        NavigatorService.navigate('SelectProfile');
      } else {
        this.startAssessmentFlow(this.currentPatient);
      }
    },
    ArchiveReason: () => {
      NavigatorService.navigate('SelectProfile');
    },
    ValidationStudyIntro: () => {
      NavigatorService.navigate('ValidationStudyInfo');
    },
    ValidationStudyInfo: () => {
      NavigatorService.navigate('ValidationStudyConsent', {
        viewOnly: false,
      });
    },
    Consent: () => {
      NavigatorService.navigate('Register');
    },
    VaccineRegistryInfo: () => {
      NavigatorService.navigate('WelcomeRepeat');
    },
  } as ScreenFlow;

  async init() {
    await this.contentService.getStartupInfo();
    this.patientId = await this.userService.getFirstPatientId();
    if (this.patientId) {
      this.currentPatient = await this.userService.getPatientState(this.patientId);
    }
  }

  getConfig(): ConfigType {
    return this.userService.getConfig();
  }

  resetToProfileStartAssessment() {
    NavigatorService.navigate('SelectProfile');
    this.startAssessmentFlow(this.currentPatient);
  }

  startPatientFlow(currentPatient: PatientStateType) {
    patientCoordinator.init(this, { currentPatient }, this.userService);
    patientCoordinator.startPatient();
  }

  startAssessmentFlow(currentPatient: PatientStateType) {
    assessmentCoordinator.init(this, { currentPatient }, this.userService, assessmentService);
    assessmentCoordinator.startAssessment();
  }

  startDietStudyFlow(currentPatient: PatientStateType, startedFromMenu: boolean, timePeriod: string = LAST_4_WEEKS) {
    dietStudyCoordinator.init(
      this,
      { currentPatient, timePeriod, startedFromMenu },
      this.userService,
      this.dietStudyService
    );
    dietStudyCoordinator.startDietStudy();
  }

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  async editProfile(profile: Profile) {
    const patientInfo = await this.userService.getPatient(profile.id);
    this.patientId = profile.id;
    NavigatorService.navigate('EditProfile', { profile, patientInfo: patientInfo! });
  }

  async profileSelected(profile: Profile) {
    await this.setPatientId(profile.id);
    if (isGBCountry() && !this.currentPatient.isReportedByAnother) {
      if (await this.userService.shouldAskForValidationStudy(false)) {
        this.goToUKValidationStudy();
      } else if (await this.shouldShowDietStudyInvite()) {
        this.startDietStudyFlow(this.currentPatient, false);
      } else {
        this.startAssessmentFlow(this.currentPatient);
      }
    } else {
      this.startAssessmentFlow(this.currentPatient);
    }
  }

  async setPatientId(patientId: string) {
    this.patientId = patientId;
    this.currentPatient = await this.userService.getPatientState(this.patientId!);
  }

  goToDietStart() {
    this.startDietStudyFlow(this.currentPatient, true);
  }

  goToUKValidationStudy() {
    NavigatorService.navigate('ValidationStudyIntro');
  }

  goToArchiveReason(patientId: string) {
    NavigatorService.navigate('ArchiveReason', { patientId });
  }

  goToPreRegisterScreens() {
    if (isUSCountry()) {
      NavigatorService.navigate('BeforeWeStartUS');
    } else {
      NavigatorService.navigate('Consent', { viewOnly: false });
    }
  }

  goToResetPassword() {
    NavigatorService.navigate('ResetPassword');
  }

  goToCreateProfile(avatarName: string) {
    NavigatorService.navigate('CreateProfile', { avatarName });
  }

  async shouldShowDietStudyInvite(): Promise<boolean> {
    // Check local storage for a cached answer
    const consent = await AsyncStorageService.getDietStudyConsent();
    if (consent === DietStudyConsent.SKIP) return false;

    // Check Server
    return await this.userService.shouldShowDietStudy();
  }

  async shouldShowStudiesMenu(): Promise<boolean> {
    const consent = await AsyncStorageService.getDietStudyConsent();
    return consent !== DietStudyConsent.SKIP;
  }

  goToVaccineRegistry() {
    NavigatorService.navigate('VaccineRegistrySignup', { currentPatient: this.currentPatient });
  }

  vaccineRegistryResponse(response: boolean) {
    this.userService.setVaccineRegistryResponse(response);
    if (response) {
      Analytics.track(events.JOIN_VACCINE_REGISTER);
      NavigatorService.navigate('VaccineRegistryInfo', { currentPatient: this.currentPatient });
    } else {
      Analytics.track(events.DECLINE_VACCINE_REGISTER);
      NavigatorService.goBack();
    }
  }

  goToEditLocation(profile: Profile, patientInfo: PatientInfosRequest) {
    NavigatorService.navigate('EditLocation', { profile, patientInfo });
  }
}

const appCoordinator = new AppCoordinator();

export default appCoordinator;
