import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { IUserService } from '@covid/core/user/UserService';
import {
  homeScreenName,
  ILocalisationService,
  isGBCountry,
  isUSCountry,
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
import NavigatorService from '@covid/NavigatorService';
import Analytics, { events } from '@covid/core/Analytics';
import { Profile } from '@covid/components/Collections/ProfileList';
import { PatientData } from '@covid/core/patient/PatientData';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import store from '@covid/core/state/store';
import {
  fetchDismissedCallouts,
  fetchLocalTrendLine,
  FetchLocalTrendlinePayload,
  fetchStartUpInfo,
  fetchUKMetrics,
} from '@covid/core/content/state/contentSlice';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { UserResponse } from '@covid/core/user/dto/UserAPIContracts';
import { Coordinator, EditableProfile, SelectProfile } from '@covid/core/Coordinator';
import dietStudyPlaybackCoordinator from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { IDietScoreRemoteClient } from '@covid/core/diet-score/DietScoreApiClient';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export class AppCoordinator extends Coordinator implements SelectProfile, EditableProfile {
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

  @lazyInject(Services.DietScore)
  dietScoreService: IDietScoreRemoteClient;

  navigation: NavigationType;
  patientData: PatientData;

  shouldShowCountryPicker: boolean = false;

  thisUser: UserResponse | null;

  screenFlow: Partial<ScreenFlow> = {
    Splash: () => {
      if (this.patientData && this.shouldShowCountryPicker) {
        NavigatorService.replace('CountrySelect', {
          onComplete: () => {
            NavigatorService.replace(homeScreenName());
          },
        });
      } else if (this.patientData && this.thisUser) {
        NavigatorService.replace(homeScreenName());
      } else {
        NavigatorService.replace('Welcome');
      }
    },
    Login: () => {
      NavigatorService.reset([{ name: homeScreenName() }]);
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
        NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
      } else {
        this.startAssessmentFlow(this.patientData);
      }
    },
    Dashboard: () => {
      // UK only so currently no need to check config.enableMultiplePatients
      NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
    },
    DashboardUS: () => {
      NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
    },
    ArchiveReason: () => {
      NavigatorService.navigate('SelectProfile'); // Go back to SelectProfile with last used params
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
      NavigatorService.navigate(homeScreenName());
    },
  };

  async init() {
    let user: UserResponse | null = null;
    let patientId: string | null = null;

    await this.userService.loadUser();

    if (this.userService.hasUser) {
      user = await this.userService.getUser();
      this.thisUser = user;
      patientId = user?.patients[0] ?? null;
    }

    if (patientId && user) {
      this.patientData = await this.patientService.getPatientDataById(patientId);
      this.shouldShowCountryPicker = user!.country_code !== LocalisationService.userCountry;
    }

    await this.fetchInitialData();

    // Track insights
    if (this.shouldShowCountryPicker) {
      Analytics.track(events.MISMATCH_COUNTRY_CODE, { current_country_code: LocalisationService.userCountry });
    }
  }

  async fetchInitialData(): Promise<void> {
    await store.dispatch(fetchStartUpInfo());
    await store.dispatch(fetchDismissedCallouts());
    if (isGBCountry()) {
      await store.dispatch(fetchUKMetrics());
    }
  }

  getConfig(): ConfigType {
    return this.localisationService.getConfig();
  }

  resetToProfileStartAssessment() {
    NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
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

  startDietStudyPlaybackFlow(patientData: PatientData) {
    dietStudyPlaybackCoordinator.init(this, patientData, this.contentService, this.dietScoreService);
    dietStudyPlaybackCoordinator.startDietStudyPlayback();
  }

  async startEditProfile(profile: Profile) {
    await this.setPatientByProfile(profile);

    editProfileCoordinator.init(this.patientData, this.userService);
    editProfileCoordinator.startEditProfile();
  }

  async startEditLocation(profile: Profile, patientData?: PatientData) {
    if (!patientData) await this.setPatientByProfile(profile);
    editProfileCoordinator.init(patientData ?? this.patientData, this.userService);
    editProfileCoordinator.goToEditLocation();
  }

  async profileSelected(profile: Profile) {
    await this.setPatientByProfile(profile);
    if (isGBCountry() && !this.patientData.patientState.isReportedByAnother) {
      if (await this.consentService.shouldAskForValidationStudy(false)) {
        this.goToUKValidationStudy();
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

  goToDietStudyPlayback() {
    this.startDietStudyPlaybackFlow(this.patientData);
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

  goToTrendline(lad?: string) {
    NavigatorService.navigate('Trendline', { lad });
  }

  goToSearchLAD() {
    NavigatorService.navigate('SearchLAD');
  }

  async shouldShowTrendLine(): Promise<boolean> {
    const { startupInfo } = store.getState().content;

    // Check feature flag (BE should check does user have LAD, is missing LAD will return false)
    if (startupInfo && !startupInfo.show_trendline) {
      return false;
    }

    if (!startupInfo?.local_data?.lad) {
      return false;
    }

    // Check does local trendline has enough data
    try {
      const result = await store.dispatch(fetchLocalTrendLine());

      // TODO: Warning this is not typed. Need to look into typing with async thunk
      const { localTrendline } = result.payload as FetchLocalTrendlinePayload;

      // Double check local trendline results
      if (!result || !localTrendline) {
        return false;
      }

      return !!localTrendline.timeseries && localTrendline.timeseries?.length > 0;
    } catch (error) {
      return false;
    }
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
