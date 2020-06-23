import { PatientStateType } from '@covid/core/patient/PatientState';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';
import { PatientData } from '@covid/core/patient/PatientCoordinator';

export enum ConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type ScreenParamList = {
  Splash: undefined;

  // Welcome screens
  Welcome: undefined;
  Welcome2: undefined;
  WelcomeRepeat: { patientId: string };

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
  CountrySelect: { patientId: string | null };
  OptionalInfo: { patientId: string };

  // Profile screens
  ReportForOther: undefined;
  SelectProfile: undefined;
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: ConsentType };
  EditProfile: { profile: Profile };
  ArchiveReason: { profileId: string };

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

  // Completion screens
  ThankYou: undefined;
  ThankYouUK: undefined;
  ViralThankYou: undefined;

  ValidationStudyIntro: { currentPatient: PatientStateType };
  ValidationStudyInfo: { currentPatient?: PatientStateType };
  ValidationStudyConsent: { viewOnly: boolean; currentPatient?: PatientStateType };
};
