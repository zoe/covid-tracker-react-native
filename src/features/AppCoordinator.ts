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
type RouteParamsType = PatientIdParamType | CurrentPatientParamType | ConsentView | ProfileParamType | ProfileIdType; //TODO Can be used for passing params to goToNextScreen

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
    Login: () => {
      this.navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeRepeat' }],
      });
    },
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
    ArchiveReason: () => {
      this.navigation.navigate('SelectProfile');
    },
    ValidationStudyIntro: () => {
      this.navigation.navigate('ValidationStudyInfo');
    },
    ValidationStudyInfo: () => {
      this.navigation.navigate('ValidationStudyConsent', {
        viewOnly: false,
      });
    },
    Consent: () => {
      this.navigation.navigate('Register');
    },
  } as ScreenFlow;

  async init(navigation: NavigationType) {
    this.navigation = navigation;
    await this.contentService.getStartupInfo();
    this.patientId = await this.userService.getFirstPatientId();
    if (this.patientId) {
      this.currentPatient = await this.userService.getCurrentPatient(this.patientId);
    }
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

  resetToProfileStartAssessment() {
    this.navigation.navigate('SelectProfile');
    this.startAssessmentFlow(this.currentPatient);
  }

  startPatientFlow(currentPatient: PatientStateType) {
    patientCoordinator.init(this, this.navigation, { currentPatient }, this.userService);
    patientCoordinator.startPatient();
  }

  startAssessmentFlow(currentPatient: PatientStateType) {
    assessmentCoordinator.init(this, this.navigation, { currentPatient }, this.userService, assessmentService);
    assessmentCoordinator.startAssessment();
  }

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  editProfile(profile: Profile) {
    this.navigation.navigate('EditProfile', { profile });
  }

  async profileSelected(mainProfile: boolean, currentPatient: PatientStateType) {
    this.currentPatient = currentPatient;
    this.patientId = currentPatient.patientId;
    if (isGBCountry() && mainProfile && (await this.userService.shouldAskForValidationStudy(false))) {
      this.goToUKValidationStudy();
    } else {
      this.startAssessmentFlow(currentPatient);
    }
  }

  async setPatientId(patientId: string) {
    this.patientId = patientId;
    this.currentPatient = await this.userService.getCurrentPatient(this.patientId!);
  }

  goToUKValidationStudy() {
    this.navigation.navigate('ValidationStudyIntro');
  }

  goToArchiveReason(profileId: string) {
    this.navigation.navigate('ArchiveReason', { profileId });
  }

  goToPreRegisterScreens() {
    if (isUSCountry()) {
      this.navigation.navigate('BeforeWeStartUS');
    } else {
      this.navigation.navigate('Consent', { viewOnly: false });
    }
  }

  goToResetPassword() {
    this.navigation.navigate('ResetPassword');
  }

  goToCreateProfile(avatarName: string) {
    this.navigation.navigate('CreateProfile', { avatarName });
  }
}

const appCoordinator = new AppCoordinator();

export default appCoordinator;
