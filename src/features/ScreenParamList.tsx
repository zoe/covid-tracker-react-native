import { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { ISchoolModel, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

export enum ConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type ScreenParamList = {
  Splash: undefined;

  // Welcome screens
  Welcome: undefined;
  Welcome2: undefined;
  WelcomeRepeat: undefined;

  // Terms & consent screens
  Consent: { viewOnly: boolean };
  PrivacyPolicyUK: { viewOnly: boolean };
  BeforeWeStartUS: undefined;
  NursesConsentUS: { viewOnly: boolean };
  TermsOfUseUS: { viewOnly: boolean };
  PrivacyPolicyUS: { viewOnly: boolean };
  PrivacyPolicySV: { viewOnly: boolean };

  // User profile screens
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;
  Register: undefined;
  Login: { terms: string };
  CountrySelect: { onComplete?: VoidFunction };
  OptionalInfo: undefined;

  // Profile screens
  SelectProfile: { assessmentFlow: boolean };
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: ConsentType };
  ArchiveReason: { patientId: string };

  EditProfile: { patientData: PatientData };
  EditLocation: { patientData: PatientData };

  // Patient screens
  YourStudy: { patientData: PatientData; editing: boolean };
  YourWork: { patientData: PatientData };
  AboutYou: { patientData: PatientData; editing: boolean };
  YourHealth: { patientData: PatientData };
  PreviousExposure: { patientData: PatientData };

  // Assessment screens
  HealthWorkerExposure: { assessmentData: AssessmentData };
  CovidTestList: { assessmentData: AssessmentData; tests?: CovidTest[] };
  CovidTestDetail: { assessmentData: AssessmentData; test?: CovidTest };
  CovidTestConfirm: { assessmentData: AssessmentData; test: CovidTest };
  HowYouFeel: { assessmentData: AssessmentData };
  WhereAreYou: { assessmentData: AssessmentData };
  TreatmentSelection: { assessmentData: AssessmentData; location: string };
  TreatmentOther: { assessmentData: AssessmentData; location: string };
  ProfileBackDate: { assessmentData: AssessmentData };
  GeneralSymptoms: { assessmentData: AssessmentData };
  HeadSymptoms: { assessmentData: AssessmentData };
  ThroatChestSymptoms: { assessmentData: AssessmentData };
  GutStomachSymptoms: { assessmentData: AssessmentData };
  OtherSymptoms: { assessmentData: AssessmentData };

  // Vaccines
  VaccineDoseSymptoms: { assessmentData: AssessmentData; dose: string };
  VaccineList: { assessmentData: AssessmentData };
  AboutYourVaccine: { assessmentData: AssessmentData; editIndex?: number };
  VaccineLogSymptomsInfo: { assessmentData: AssessmentData };
  VaccineFindInfo: { assessmentData: AssessmentData };

  // Completion screens
  ThankYouSE: undefined;
  ThankYouUK: undefined;
  ThankYouUS: undefined;

  Dashboard: undefined;
  DashboardUS: undefined;
  EstimatedCases: undefined;

  // School network
  SchoolIntro: undefined;
  SchoolHowTo: { patientData: PatientData };
  SelectSchool: undefined;
  JoinSchool: { patientData: PatientData; higherEducation: boolean };
  JoinSchoolGroup: { patientData: PatientData; selectedSchool: ISchoolModel };
  SchoolSuccess: undefined;
  SchoolGroupList: { patientData: PatientData; selectedSchool: ISchoolModel };
  SchoolDashboard: { school: ISubscribedSchoolStats };
  ConfirmSchool: { patientData: PatientData; school: ISchoolModel };
  JoinHigherEducation: { patientData: PatientData };

  // Diet study
  DietStudy: undefined;
  DietStudyGlobal: undefined;
  DietStudyGut: undefined;
  DietStudyTraditional: undefined;

  // Mental health playback
  MentalHealthPlaybackBlogPost: undefined;
  MentalHealthPlaybackGeneral: undefined;
  MentalHealthPlaybackIntroduction: undefined;
  MentalHealthPlaybackRating: undefined;
  MentalHealthPlaybackThankYou: undefined;

  // Mental health study
  MentalHealthChanges: undefined;
  MentalHealthFrequency: undefined;
  MentalHealthHistory: undefined;
  MentalHealthSupport: undefined;
  MentalHealthLearning: undefined;
  MentalHealthEnd: undefined;

  // Reconsent
  ReconsentIntroduction: undefined;
  ReconsentDiseasePreferences: undefined;
  ReconsentDiseaseSummary: undefined;
  ReconsentRequestConsent: undefined;
  ReconsentFeedback: undefined;
  ReconsentReconsider: undefined;
  ReconsentNewsletterSignup: undefined;

  // Others
  Modal: undefined;
  Main: undefined;
  Share: undefined;
  VaccineListMissingModal: { vaccine: VaccineRequest };
  VersionUpdateModal: undefined;

  Trendline: { lad?: string };

  Anniversary: undefined;

  LongCovidStart: { patientData: PatientData };
  LongCovidQuestion: { patientData: PatientData };
};
