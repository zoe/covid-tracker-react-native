import Analytics, { events } from '@covid/core/Analytics';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TConfigType } from '@covid/core/Config';
import { ConsentService } from '@covid/core/consent/ConsentService';
import { contentService } from '@covid/core/content/ContentService';
import { Coordinator, IEditableProfile, ISelectProfile, TScreenFlow } from '@covid/core/Coordinator';
import { dietScoreApiClient } from '@covid/core/diet-score/DietScoreApiClient';
import {
  homeScreenName,
  isGBCountry,
  isUSCountry,
  LocalisationService,
  localisationService,
} from '@covid/core/localisation/LocalisationService';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TProfile } from '@covid/core/profile/ProfileService';
import {
  fetchDismissedCallouts,
  fetchFeaturedContent,
  fetchStartUpInfo,
  fetchUKMetrics,
} from '@covid/core/state/contentSlice';
import store from '@covid/core/state/store';
import { TUserResponse } from '@covid/core/user/dto/UserAPIContracts';
import { userService } from '@covid/core/user/UserService';
import { dietStudyPlaybackCoordinator } from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { assessmentService } from '@covid/services';
import { StackNavigationProp } from '@react-navigation/stack';

type TNavigationType = StackNavigationProp<TScreenParamList, keyof TScreenParamList>;

export class AppCoordinator extends Coordinator implements ISelectProfile, IEditableProfile {
  navigation: TNavigationType;

  patientData: TPatientData;

  shouldShowCountryPicker: boolean = false;

  screenFlow: Partial<TScreenFlow> = {
    // added to make available to gotoNextscreen
    Anniversary: () => {
      NavigatorService.navigate('Anniversary');
    },

    ArchiveReason: () => {
      NavigatorService.navigate('SelectProfile'); // Go back to SelectProfile with last used params
    },

    Consent: () => {
      NavigatorService.navigate('Register');
    },

    Dashboard: () => {
      // UK only so currently no need to check config.enableMultiplePatients
      NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
    },

    DashboardUS: () => {
      NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
    },

    Login: () => {
      NavigatorService.reset([{ name: homeScreenName() }]);
    },

    OptionalInfo: () => {
      this.startPatientFlow(this.patientData);
    },

    Register: () => {
      const config = appCoordinator.getConfig();

      let askPersonalInfo = config?.enablePersonalInformation;
      if (isUSCountry() && ConsentService.consentSigned.document !== 'US Nurses') {
        askPersonalInfo = false;
      }

      if (askPersonalInfo) {
        NavigatorService.replace('OptionalInfo');
      } else if (this.patientData) {
        this.startPatientFlow(this.patientData);
      } else {
        // eslint-disable-next-line no-console
        console.error('[ROUTE] Missing patientId parameter for gotoNextPage(Register)');
      }
    },

    Splash: () => {
      if (userService.hasUser && this.patientData && this.shouldShowCountryPicker) {
        NavigatorService.replace('CountrySelect', {
          onComplete: () => {
            NavigatorService.replace(homeScreenName());
          },
        });
      } else if (userService.hasUser && this.patientData) {
        NavigatorService.replace(homeScreenName());
      } else {
        NavigatorService.replace('Welcome');
      }
    },

    WelcomeRepeat: () => {
      const config = this.getConfig();
      if (config?.enableMultiplePatients) {
        NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
      } else {
        this.startAssessmentFlow(this.patientData);
      }
    },
  };

  async init(setUsername: (username: string) => void, setPatients: (patients: string[]) => void) {
    let user: TUserResponse | null = null;
    let patientId: string | null = null;

    await userService.loadUser();

    if (userService.hasUser) {
      user = await userService.getUser();
      patientId = user?.patients[0] ?? null;
      setUsername(user?.username ?? '');
      setPatients(user?.patients ?? []);
    }

    if (patientId && user) {
      this.patientData = await patientService.getPatientDataById(patientId);
      this.shouldShowCountryPicker = user!.country_code !== LocalisationService.userCountry;
    }

    await this.fetchInitialData();

    const { startupInfo } = store.getState().content;

    if (startupInfo?.app_requires_update) {
      this.goToVersionUpdateModal();
    }

    Analytics.identify();

    if (this.shouldShowCountryPicker) {
      Analytics.track(events.MISMATCH_COUNTRY_CODE, { current_country_code: LocalisationService.userCountry });
    }
  }

  async fetchInitialData(): Promise<void> {
    await store.dispatch(fetchStartUpInfo());
    await store.dispatch(fetchDismissedCallouts());
    await store.dispatch(fetchFeaturedContent());
    if (isGBCountry()) {
      await store.dispatch(fetchUKMetrics());
    }
  }

  getConfig(): TConfigType | undefined {
    return localisationService.getConfig();
  }

  resetToProfileStartAssessment = () => {
    NavigatorService.navigate('SelectProfile', { assessmentFlow: true });
    this.startAssessmentFlow(this.patientData);
  };

  startPatientFlow = (patientData: TPatientData) => {
    patientCoordinator.init(this, patientData, userService);
    patientCoordinator.startPatient();
  };

  startAssessmentFlow = async (patientData: TPatientData) => {
    // TODO: Does not need to be async
    assessmentCoordinator.init(this, { patientData }, assessmentService);
    assessmentCoordinator.startAssessment();
  };

  startEditProfile = async (profile: TProfile) => {
    await this.setPatientByProfile(profile);
    editProfileCoordinator.init(this.patientData, userService);
    editProfileCoordinator.startEditProfile();
  };

  startEditLocation = async (profile: TProfile, patientData?: TPatientData) => {
    if (!patientData) await this.setPatientByProfile(profile);
    editProfileCoordinator.init(patientData ?? this.patientData, userService);
    editProfileCoordinator.goToEditLocation();
  };

  profileSelected = async (profile: TProfile) => {
    await this.setPatientByProfile(profile);
    this.startAssessmentFlow(this.patientData);
  };

  setPatientById = async (patientId: string) => {
    this.patientData = await patientService.getPatientDataById(patientId);
  };

  setPatientByProfile = async (profile: TProfile) => {
    this.patientData = await patientService.getPatientDataByProfile(profile);
  };

  setPatientToPrimary = async () => {
    const user = await userService.getUser();
    const patientId = user?.patients[0] ?? null;

    if (patientId) {
      await this.setPatientById(patientId);
    }
  };

  goToVersionUpdateModal = () => {
    NavigatorService.navigate('VersionUpdateModal');
  };

  goToDietStudy = async () => {
    // Reset the current PatientData to the primary user.
    // We can get here if by viewing DietScores after reporting from a secondary profile
    if (this.patientData.patientState.isReportedByAnother) {
      await this.setPatientToPrimary();
    }
    dietStudyPlaybackCoordinator.init(this, this.patientData, contentService, dietScoreApiClient);
    NavigatorService.navigate('DietStudy');
  };

  goToArchiveReason = (patientId: string) => {
    NavigatorService.navigate('ArchiveReason', { patientId });
  };

  goToPreRegisterScreens = () => {
    if (isUSCountry()) {
      NavigatorService.navigate('BeforeWeStartUS');
    } else {
      NavigatorService.navigate('Consent', { viewOnly: false });
    }
  };

  goToResetPassword = () => {
    NavigatorService.navigate('ResetPassword');
  };

  goToCreateProfile = (avatarName: string) => {
    NavigatorService.navigate('CreateProfile', { avatarName });
  };

  goToTrendline = () => {
    NavigatorService.navigate('Trendline');
  };

  shouldShowTrendline(): boolean {
    const { startupInfo } = store.getState().content;

    return !!(startupInfo?.show_trendline && startupInfo?.local_data?.lad);
  }

  goToMentalHealthStudy = () => {
    NavigatorService.navigate('MentalHealthChanges');
  };

  goToMentalHealthStudyPlayback = () => {
    NavigatorService.navigate('MentalHealthPlaybackIntroduction');
  };

  goToAnniversary = () => {
    NavigatorService.navigate('Anniversary');
  };
}

export const appCoordinator = new AppCoordinator();
