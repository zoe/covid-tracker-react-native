import { PatientStateType } from '@covid/core/patient/PatientState';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { UserResponse } from '@covid/core/user/dto/UserAPIContracts';
import AssessmentCoordinator, { AssessmentData } from '@covid/features/assessment/AssessmentCoordinator';

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

  // Patient screens
  StartPatient: { currentPatient: PatientStateType };
  YourStudy: { currentPatient: PatientStateType };
  YourWork: { currentPatient: PatientStateType };
  AboutYou: { currentPatient: PatientStateType };
  YourHealth: { currentPatient: PatientStateType };
  PreviousExposure: { currentPatient: PatientStateType };

  // Assessment screens
  HealthWorkerExposure: { coordinator: AssessmentData };
  CovidTest: { coordinator: AssessmentData; tests?: CovidTest[] };
  CovidTestDetail: { coordinator: AssessmentData; test?: CovidTest };
  HowYouFeel: { coordinator: AssessmentData };
  DescribeSymptoms: { coordinator: AssessmentData };
  WhereAreYou: { coordinator: AssessmentData };
  LevelOfIsolation: { coordinator: AssessmentData };
  TreatmentSelection: { coordinator: AssessmentData; location: string };
  TreatmentOther: { coordinator: AssessmentData; location: string };
  ProfileBackDate: { coordinator: AssessmentData };

  // Completion screens
  ThankYou: undefined;
  ViralThankYou: undefined;

  ValidationStudyIntro: { currentPatient: PatientStateType };
  ValidationStudyConsent: { viewOnly: boolean; currentPatient: PatientStateType };
};
