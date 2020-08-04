import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { PatientData } from '@covid/core/patient/PatientCoordinator';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { DietStudyData } from '@covid/core/diet-study/DietStudyCoordinator';
import { Profile } from '@covid/components/Collections/ProfileList';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

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
  CountrySelect: undefined;
  OptionalInfo: undefined;

  // Profile screens
  ReportForOther: undefined;
  SelectProfile: undefined;
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: ConsentType };
  EditProfile: { profile: Profile; patientInfo: PatientInfosRequest };
  EditLocation: { profile: Profile; patientInfo: PatientInfosRequest };
  ArchiveReason: { patientId: string };

  // Patient screens
  YourStudy: { patientData: PatientData };
  YourWork: { patientData: PatientData };
  AboutYou: { patientData: PatientData };
  YourHealth: { patientData: PatientData };
  PreviousExposure: { patientData: PatientData };

  // Assessment screens
  HealthWorkerExposure: { assessmentData: AssessmentData };
  CovidTestList: { assessmentData: AssessmentData; tests?: CovidTest[] };
  CovidTestDetail: { assessmentData: AssessmentData; test?: CovidTest };
  HowYouFeel: { assessmentData: AssessmentData };
  DescribeSymptoms: { assessmentData: AssessmentData };
  WhereAreYou: { assessmentData: AssessmentData };
  LevelOfIsolation: { assessmentData: AssessmentData };
  TreatmentSelection: { assessmentData: AssessmentData; location: string };
  TreatmentOther: { assessmentData: AssessmentData; location: string };
  ProfileBackDate: { assessmentData: AssessmentData };
  Lifestyle: { assessmentData: AssessmentData };

  VaccineRegistrySignup: { currentPatient: PatientStateType };
  VaccineRegistryInfo: { currentPatient: PatientStateType };

  // DietStudy
  DietStudyIntro: { dietStudyData: DietStudyData };
  DietStudyAboutYou: { dietStudyData: DietStudyData };
  DietStudyThankYouBreak: { dietStudyData: DietStudyData };
  DietStudyThankYou: { dietStudyData: DietStudyData };
  DietStudyTypicalDiet: { dietStudyData: DietStudyData };
  DietStudyYourLifestyle: { dietStudyData: DietStudyData };
  DietStudyConsent: { dietStudyData: DietStudyData };

  // Completion screens
  ThankYou: undefined;
  ThankYouUK: undefined;
  ViralThankYou: undefined;

  ValidationStudyIntro: undefined;
  ValidationStudyInfo: undefined;
  ValidationStudyConsent: { viewOnly: boolean };

  Dashboard: undefined;
};
