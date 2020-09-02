import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { IUserService } from '@covid/core/user/UserService';
import {
  isGBCountry,
  isUSCountry,
  ILocalisationService,
  LocalisationService,
} from '@covid/core/localisation/LocalisationService';
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
import store from '@covid/core/state/store';
import { fetchStartUpInfo, fetchUKMetrics } from '@covid/core/content/state/contentSlice';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { UserResponse } from '@covid/core/user/dto/UserAPIContracts';

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
  patientData: PatientData;

  homeScreenName: ScreenName = 'WelcomeRepeat';

  shouldShowCountryPicker: boolean = false;

  screenFlow: Partial<ScreenFlow> = {
    Splash: () => {
      if (this.patientData && this.shouldShowCountryPicker) {
        NavigatorService.replace('CountrySelect', {
          onComplete: () => {
            NavigatorService.replace(this.homeScreenName);
          },
        });
      } else if (this.patientData) {
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
      } else if (this.patientData) {
        this.startPatientFlow(this.patientData);
      } else {
        console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
      }
    },
    OptionalInfo: () => {
      this.startPatientFlow(this.patientData);
    },
    WelcomeRepeat: () => {
      const config = this.getConfig();
      if (config.enableMultiplePatients) {
        NavigatorService.navigate('SelectProfile');
      } else {
        this.startAssessmentFlow(this.patientData);
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
    let shouldShowCountryPicker = false;
    let user: UserResponse | null = null;
    let patientId: string | null = null;

    await this.userService.loadUser();

    if (this.userService.hasUser) {
      user = await this.userService.getUser();
      patientId = user?.patients[0] ?? null;
    }

    if (patientId && user) {
      this.patientData = await this.patientService.getPatientDataById(patientId);
      shouldShowCountryPicker = user!.country_code !== LocalisationService.userCountry;
    }

    await this.fetchInitialData();
    this.setHomeScreenName();

    // Track insights
    if (shouldShowCountryPicker) {
      Analytics.track(events.MISMATCH_COUNTRY_CODE, { current_country_code: LocalisationService.userCountry });
    }
  }

  async fetchInitialData(): Promise<void> {
    await store.dispatch(fetchStartUpInfo());
    if (isGBCountry()) {
      await store.dispatch(fetchUKMetrics());
    }
  }

  setHomeScreenName(): void {
    // Set main route depending on API / Country
    this.homeScreenName = store.getState().content.startupInfo?.show_new_dashboard ? 'Dashboard' : 'WelcomeRepeat';
    this.homeScreenName = isGBCountry() ? this.homeScreenName : 'WelcomeRepeat';
  }

  getConfig(): ConfigType {
    return this.localisationService.getConfig();
  }

  resetToProfileStartAssessment() {
    NavigatorService.navigate('SelectProfile');
    this.startAssessmentFlow(this.patientData);
  }

  startPatientFlow(patientData: PatientData) {
    patientCoordinator.init(this, patientData, this.userService);
    patientCoordinator.startPatient();
  }

  async startAssessmentFlow(patientData: PatientData) {
    assessmentCoordinator.init(this, { patientData }, this.userService, assessmentService);
    assessmentCoordinator.startAssessment();
  }

  startDietStudyFlow(patientData: PatientData, startedFromMenu: boolean, timePeriod: string = LAST_4_WEEKS) {
    dietStudyCoordinator.init(
      this,
      { patientData, timePeriod, startedFromMenu },
      this.userService,
      this.dietStudyService
    );
    dietStudyCoordinator.startDietStudy();
  }

  async startEditProfile(profile: Profile) {
    await this.setPatientByProfile(profile);

    editProfileCoordinator.init(this, this.patientData, this.userService);
    editProfileCoordinator.startEditProfile();
  }

  async startEditLocation(profile: Profile, patientData?: PatientData) {
    if (!patientData) await this.setPatientByProfile(profile);
    editProfileCoordinator.init(this, patientData ?? this.patientData, this.userService);
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
    await this.setPatientByProfile(profile);
    if (isGBCountry() && !this.patientData.patientState.isReportedByAnother) {
      if (await this.consentService.shouldAskForValidationStudy(false)) {
        this.goToUKValidationStudy();
      } else if (await this.shouldShowDietStudyInvite()) {
        this.startDietStudyFlow(this.patientData, false);
      } else {
        this.startAssessmentFlow(this.patientData);
      }
    } else {
      this.startAssessmentFlow(this.patientData);
    }
  }

  async setPatientById(patientId: string) {
    this.patientData = await this.patientService.getPatientDataById(patientId);
  }

  async setPatientByProfile(profile: Profile) {
    this.patientData = await this.patientService.getPatientDataByProfile(profile);
  }

  goToDietStart() {
    this.startDietStudyFlow(this.patientData, true);
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
    NavigatorService.navigate('VaccineRegistrySignup', { currentPatient: this.patientData.patientState });
  }

  vaccineRegistryResponse(response: boolean) {
    this.consentService.setVaccineRegistryResponse(response);
    if (response) {
      Analytics.track(events.JOIN_VACCINE_REGISTER);
      NavigatorService.navigate('VaccineRegistryInfo', { currentPatient: this.patientData.patientState });
    } else {
      Analytics.track(events.DECLINE_VACCINE_REGISTER);
      NavigatorService.goBack();
    }
  }
}

const appCoordinator = new AppCoordinator();

export default appCoordinator;
