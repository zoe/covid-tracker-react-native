import { TSharable } from '@covid/components/screens/share/Container';
import { TAssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { TPatientData } from '@covid/core/patient/PatientData';
import { ISchoolModel, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { EVaccineTypes, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

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
  Login: { terms: string };
  OptionalInfo: undefined;
  Register: undefined;
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;

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

  // Pingdemic
  Pingdemic: { assessmentData: TAssessmentData };

  // Vaccines
  AboutYourVaccine: { assessmentData: TAssessmentData; editDoseId?: string };
  VaccineDoseSymptoms: { assessmentData: TAssessmentData; dose: string };
  VaccineFindInfo: { assessmentData: TAssessmentData };
  VaccineList: { assessmentData: TAssessmentData; vaccineType?: EVaccineTypes };
  VaccineLogSymptomsInfo: { assessmentData: TAssessmentData };

  // Completion screens
  ThankYouSE: undefined;
  ThankYouUK: undefined;
  ThankYouUS: undefined;

  // Dashboards
  Dashboard: undefined;
  DashboardUS: undefined;

  // School network
  ConfirmSchool: { patientData: TPatientData; school: ISchoolModel };
  JoinHigherEducation: { patientData: TPatientData };
  JoinSchool: { patientData: TPatientData; higherEducation: boolean };
  JoinSchoolGroup: { patientData: TPatientData; selectedSchool: ISchoolModel };
  SchoolDashboard: { school: ISubscribedSchoolStats };
  SchoolGroupList: { patientData: TPatientData; selectedSchool: ISchoolModel };
  SchoolHowTo: { patientData: TPatientData };
  SchoolIntro: undefined;
  SchoolSuccess: undefined;
  SelectSchool: undefined;

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

  // Media centre
  MediaCentre: undefined;

  // Others
  Anniversary: undefined;
  EstimatedCases: undefined;
  Main: undefined;
  Modal: undefined;
  Share: { sharable: TSharable | undefined; hideLabel: boolean; label: string };
  Splash: undefined;
  Trendline: undefined;
  VaccineListMissingModal: { vaccine: TVaccineRequest | undefined };
  VersionUpdateModal: undefined;
};
