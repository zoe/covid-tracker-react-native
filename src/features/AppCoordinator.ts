import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { IUserService } from '@covid/core/user/UserService';
import { isGBCountry, isUSCountry, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { Services } from '@covid/provider/services.types';
import { ConsentService, IConsentService } from '@covid/core/consent/ConsentService';
import { lazyInject } from '@covid/provider/services';
import { IPatientService } from '@covid/core/patient/PatientService';
import { IContentService } from '@covid/core/content/ContentService';
import { IDietStudyRemoteClient } from '@covid/core/diet-study/DietStudyApiClient';
import dietStudyCoordinator, { DietStudyConsent, LAST_4_WEEKS } from '@covid/core/diet-study/DietStudyCoordinator';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { Profile } from '@covid/components/Collections/ProfileList';
import { PatientData } from '@covid/core/patient/PatientData';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';

import { ScreenParamList } from './ScreenParamList';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export class AppCoordinator {
  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Content)
  contentService: IContentService;

  @lazyInject(Services.Consent)
  consentService: IConsentService;

  @lazyInject(Services.Localisation)
  localisationService: ILocalisationService;

  @lazyInject(Services.DietStudy)
  dietStudyService: IDietStudyRemoteClient;

  navigation: NavigationType;
  patientId: string | null = null;
  currentPatient: PatientStateType;

  homeScreenName: ScreenName = 'WelcomeRepeat';

  screenFlow: Partial<ScreenFlow> = {
    Splash: () => {
      if (this.patientId) {
        NavigatorService.replace(this.homeScreenName);
      } else {
        NavigatorService.replace('Welcome');
      }
    },
    Login: () => {
      NavigatorService.reset([{ name: this.homeScreenName }]);
    },
    Register: () => {
      const config = appCoordinator.getConfig();

      let askPersonalInfo = config.enablePersonalInformation;
      if (isUSCountry() && ConsentService.consentSigned.document !== 'US Nurses') {
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
    Dashboard: () => {
      // UK only so currently no need to check config.enableMultiplePatients
      NavigatorService.navigate('SelectProfile');
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
      NavigatorService.navigate(this.homeScreenName);
    },
  };

  async init() {
    await this.userService.loadUser();
    this.patientId = await this.userService.getFirstPatientId();
    if (this.patientId) {
      this.currentPatient = await this.patientService.getPatientState(this.patientId);
    }
    const info = await this.contentService.getStartupInfo();
    this.homeScreenName = info?.show_new_dashboard ? 'Dashboard' : 'WelcomeRepeat';
    this.homeScreenName = isGBCountry() ? this.homeScreenName : 'WelcomeRepeat';
  }

  getConfig(): ConfigType {
    return this.localisationService.getConfig();
  }

  async getCurrentPatient(patientId: string): Promise<PatientStateType> {
    return await this.patientService.getCurrentPatient(patientId);
  }

  getWelcomeRepeatScreenName(): keyof ScreenParamList {
    return 'WelcomeRepeat';
  }

  resetToProfileStartAssessment() {
    NavigatorService.navigate('SelectProfile');
    this.startAssessmentFlow(this.currentPatient);
  }

  startPatientFlow(currentPatient: PatientStateType) {
    const patientData: PatientData = {
      patientId: currentPatient.patientId,
      patientState: currentPatient,
      patientInfo: undefined,
      profile: undefined,
    };

    patientCoordinator.init(this, patientData, this.userService);
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

  async startEditProfile(profile: Profile) {
    await this.setPatientId(profile.id);
    const patientData = await this.buildPatientData(profile);
    editProfileCoordinator.init(this, patientData, this.userService);
    editProfileCoordinator.startEditProfile();
  }

  async startEditLocation(profile: Profile) {
    await this.setPatientId(profile.id);
    const patientData = await this.buildPatientData(profile);
    editProfileCoordinator.init(this, patientData, this.userService);
    editProfileCoordinator.goToEditLocation();
  }

  gotoNextScreen = (screenName: ScreenName) => {
    if (Object.keys(this.screenFlow).includes(screenName)) {
      (this.screenFlow as ScreenFlow)[screenName]();
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  async profileSelected(profile: Profile) {
    await this.setPatientId(profile.id);
    if (isGBCountry() && !this.currentPatient.isReportedByAnother) {
      if (await this.consentService.shouldAskForValidationStudy(false)) {
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
    this.currentPatient = await this.patientService.getPatientState(this.patientId!);
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
    return await this.consentService.shouldShowDietStudy();
  }

  async shouldShowStudiesMenu(): Promise<boolean> {
    const consent = await AsyncStorageService.getDietStudyConsent();
    return consent === DietStudyConsent.ACCEPTED || consent === DietStudyConsent.DEFER;
  }

  goToVaccineRegistry() {
    NavigatorService.navigate('VaccineRegistrySignup', { currentPatient: this.currentPatient });
  }

  vaccineRegistryResponse(response: boolean) {
    this.consentService.setVaccineRegistryResponse(response);
    if (response) {
      Analytics.track(events.JOIN_VACCINE_REGISTER);
      NavigatorService.navigate('VaccineRegistryInfo', { currentPatient: this.currentPatient });
    } else {
      Analytics.track(events.DECLINE_VACCINE_REGISTER);
      NavigatorService.goBack();
    }
  }

  private async buildPatientData(profile: Profile): Promise<PatientData> {
    const patientInfo = await this.patientService.getPatient(profile.id);
    return {
      patientId: profile.id,
      patientState: this.currentPatient,
      patientInfo: patientInfo!,
      profile,
    };
  }
}

const appCoordinator = new AppCoordinator();

export default appCoordinator;
