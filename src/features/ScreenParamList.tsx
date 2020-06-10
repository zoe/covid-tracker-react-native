import { PatientProfile, PatientStateType } from '@covid/core/patient/PatientState';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { AssessmentData } from '@covid/features/assessment/AssessmentCoordinator';
import { Profile } from '@covid/features/multi-profile/SelectProfileScreen';

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

  // PII screens
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
  StartPatient: { currentPatient: PatientStateType };
  YourStudy: { currentPatient: PatientStateType };
  YourWork: { currentPatient: PatientStateType };
  AboutYou: { currentPatient: PatientStateType };
  YourHealth: { currentPatient: PatientStateType };
  PreviousExposure: { currentPatient: PatientStateType };

  // Assessment screens
  HealthWorkerExposure: { assessmentData: AssessmentData };
  CovidTest: { assessmentData: AssessmentData; tests?: CovidTest[] };
  CovidTestDetail: { assessmentData: AssessmentData; test?: CovidTest };
  HowYouFeel: { assessmentData: AssessmentData };
  DescribeSymptoms: { assessmentData: AssessmentData };
  WhereAreYou: { assessmentData: AssessmentData };
  LevelOfIsolation: { assessmentData: AssessmentData };
  TreatmentSelection: { assessmentData: AssessmentData; location: string };
  TreatmentOther: { assessmentData: AssessmentData; location: string };
  ProfileBackDate: { assessmentData: AssessmentData };

  // Completion screens
  ThankYou: undefined;
  ThankYouUK: undefined;
  ViralThankYou: undefined;

  ValidationStudyIntro: { currentPatient: PatientStateType };
  ValidationStudyInfo: { currentPatient?: PatientStateType };
  ValidationStudyConsent: { viewOnly: boolean; currentPatient?: PatientStateType };
};
