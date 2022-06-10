import { ESharable } from '@covid/components/screens/share/types';
import { TAssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { TPatientData } from '@covid/core/patient/PatientData';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { EVaccineTypes, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  TSymptomCategory,
  TUsualSelfFrequentOtherSymptom,
  TUsualSelfFrequentSymptom,
} from '@covid/features/0-v2/assessment-flow/types';
import { TUsualSelf } from '@covid/features/0-v2/usual-self/types';
import { THPScreenName } from '@covid/features/health-profile/data/healthProfileQuestions';
import { TStudy } from '@covid/features/study-hub/types';

export enum EConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type TScreenParamList = {
  // Welcome screens
  Welcome2: undefined;
  Welcome: undefined;
  WelcomeRepeat: undefined;

  // Terms & consent screens
  BeforeWeStartUS: undefined;
  Consent: { viewOnly: boolean };
  NursesConsentUS: { viewOnly: boolean };
  PrivacyPolicySV: { viewOnly: boolean };
  PrivacyPolicyUK: { viewOnly: boolean };
  PrivacyPolicyUS: { viewOnly: boolean };
  TermsOfUseUS: { viewOnly: boolean };

  // User profile screens
  CountrySelect: { onComplete?: VoidFunction };
  OptionalInfo: undefined;
  Register: undefined;
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;

  // Authentication
  Login: undefined;

  // Profile screens
  AdultOrChild: { profileName: string; avatarName?: string };
  ArchiveReason: { patientId: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: EConsentType };
  CreateProfile: { avatarName: string };
  SelectProfile: { assessmentFlow: boolean };

  EditLocation: { patientData: TPatientData };
  EditProfile: { patientData: TPatientData };

  // Patient screens
  AboutYou: { patientData: TPatientData; editing: boolean };
  PreviousExposure: { patientData: TPatientData };
  YourHealth: { patientData: TPatientData };
  YourStudy: { patientData: TPatientData; editing: boolean };
  YourWork: { patientData: TPatientData };

  // Assessment screens
  CovidTestConfirm: { assessmentData: TAssessmentData; test: TCovidTest };
  CovidTestDetail: { assessmentData: TAssessmentData; test?: TCovidTest };
  CovidTestList: {
    assessmentData: TAssessmentData;
    tests?: TCovidTest[];
    mechanism?: ECovidTestMechanismOptions;
    is_rapid_test?: boolean;
    skipV1Flow?: boolean;
  };
  GeneralSymptoms: { assessmentData: TAssessmentData };
  GutStomachSymptoms: { assessmentData: TAssessmentData };
  HeadSymptoms: { assessmentData: TAssessmentData };
  HealthWorkerExposure: { assessmentData: TAssessmentData };
  HowYouFeel: { assessmentData: TAssessmentData };
  OtherSymptoms: { assessmentData: TAssessmentData };
  ProfileBackDate: { assessmentData: TAssessmentData };
  ThroatChestSymptoms: { assessmentData: TAssessmentData };
  TreatmentOther: { assessmentData: TAssessmentData; location: string };
  TreatmentSelection: { assessmentData: TAssessmentData; location: string };
  WhereAreYou: { assessmentData: TAssessmentData };

  // Vaccines
  AboutYourVaccine: { assessmentData: TAssessmentData; editDoseId?: string };
  VaccineDoseSymptoms: { assessmentData: TAssessmentData; dose: string; fromProfileTab?: boolean };
  VaccineFindInfo: { assessmentData: TAssessmentData };
  VaccineList: { assessmentData: TAssessmentData; vaccineType?: EVaccineTypes };
  VaccineLogSymptomsInfo: { assessmentData: TAssessmentData };

  // Completion screens
  ThankYouSE: undefined;
  ThankYouUK: undefined;
  ThankYouUS: undefined;

  // Dashboards
  Dashboard: { screen: string };
  DashboardUK: undefined;
  DashboardUS: undefined;

  // Diet study
  DietStudy: undefined;
  DietStudyGlobal: undefined;
  DietStudyGut: undefined;
  DietStudyTraditional: undefined;

  // Mental health playback
  MentalHealthPlaybackGeneral: undefined;
  MentalHealthPlaybackIntroduction: undefined;
  MentalHealthPlaybackRating: undefined;
  MentalHealthPlaybackThankYou: undefined;

  // Mental health study
  MentalHealthChanges: undefined;
  MentalHealthEnd: undefined;
  MentalHealthFrequency: undefined;
  MentalHealthHistory: undefined;
  MentalHealthLearning: undefined;
  MentalHealthSupport: undefined;

  // Reconsent
  ReconsentDiseasePreferences: undefined;
  ReconsentDiseaseSummary: undefined;
  ReconsentFeedback: undefined;
  ReconsentIntroduction: undefined;
  ReconsentNewsletterSignup: undefined;
  ReconsentReconsider: undefined;
  ReconsentRequestConsent: undefined;

  // Wider health studies
  DataConsent: undefined;
  DiseasePreferences: undefined;
  WiderHealthStudies: undefined;

  // Long COVID
  LongCovidQuestion: { patientData: TPatientData };
  LongCovidStart: { patientData: TPatientData };

  // Internal testing mode
  TestingMode: undefined;

  // Study hub
  StudiesList: undefined;
  StudyDetails: { study: TStudy };
  StudyHubOnboarding: undefined;

  // Profile
  Profile: undefined;
  ProfileOther: { patientData: TPatientData };

  // Health profile
  HPAboutYou: { navDirection?: 'backwards' };
  HPThankYou: undefined;
  HPFormScreen: { screenName: THPScreenName | 'HPThankYou'; navDirection?: 'backwards' };

  // Assessment Flow + Usual Self V2
  // TODO: Move to it's own type and directory
  UsualSelfIntroScreen: {
    secondaryOnPress?: () => void;
  };
  UsualSelfFormScreen: undefined;
  AssessmentPage1ShowUsualSelf: undefined;
  AssessmentPage2UpdateUsualSelf: {
    usualSelfSymptoms: TUsualSelfFrequentSymptom[];
    usualSelfOtherSymptoms: TUsualSelfFrequentOtherSymptom[];
    newSymptoms: TUsualSelfFrequentSymptom[] | undefined;
    newOtherSymptoms: TUsualSelfFrequentOtherSymptom[] | undefined;
  };
  AssessmentPage3LogNewSymptom: {
    usualSelfSymptoms: TUsualSelfFrequentSymptom[];
  };
  AssessmentPage4LogNewSymptomFlow: {
    categories: TSymptomCategory[];
    usualSelfSymptoms: TUsualSelfFrequentSymptom[];
  };
  AssessmentPage5LogNewSymptomReason: { report: TUsualSelf };

  // Others
  Anniversary: undefined;
  EstimatedCases: undefined;
  Main: undefined;
  Modal: undefined;
  Share: { sharable: ESharable; hideLabel: boolean; label: string };
  Splash: undefined;
  Trendline: undefined;
  VaccineListMissingModal: { vaccine: TVaccineRequest | undefined };
  VersionUpdateModal: undefined;
};
