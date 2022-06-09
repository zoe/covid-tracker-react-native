import { initialStateAssessment } from '@covid/core/assessment/state/reducers';
import { initialStateSchools } from '@covid/core/schools/Schools.slice';
import { initialStateContent } from '@covid/core/state/content/slice';
import { initialStateDietStudy } from '@covid/core/state/diet-study/slice';
import { initialStateHealthProfile } from '@covid/core/state/health-profile/slice';
import { initialStateMediaCentre } from '@covid/core/state/media-centre';
import { initialStateMentalHealthChanges } from '@covid/core/state/mental-health/changes/slice';
import { initialStateMentalHealthFrequency } from '@covid/core/state/mental-health/frequency/slice';
import { initialStateMentalHealthHistory } from '@covid/core/state/mental-health/history/slice';
import { initialStateMentalHealthLearning } from '@covid/core/state/mental-health/learning/slice';
import { initialStateMentalHealth } from '@covid/core/state/mental-health/state/slice';
import { initialStateMentalHealthSupport } from '@covid/core/state/mental-health/support/slice';
import { initialStateMentalHealthPlayback } from '@covid/core/state/mental-health-playback/slice';
import { initialStateOnboarding } from '@covid/core/state/onboarding/slice';
import { initialStateReconsent } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import { initialStateSettings } from '@covid/core/state/settings/slice';
import { initialStateStudyHub } from '@covid/core/state/study-hub/slice';
import { initialStateTestingMode } from '@covid/core/state/testingMode';
import { initialStateUser } from '@covid/core/state/user/slice';
import { initialStateVaccine } from '@covid/core/state/vaccines/slice';
import { initialState as initialStateApp } from '@health-study/redux/app';

export const initialState: TRootState = {
  app: initialStateApp,
  assessment: initialStateAssessment,
  content: initialStateContent,
  dietStudy: initialStateDietStudy,
  healthProfile: initialStateHealthProfile,
  mediaCentre: initialStateMediaCentre,
  mentalHealthChanges: initialStateMentalHealthChanges,
  mentalHealthFrequency: initialStateMentalHealthFrequency,
  mentalHealthHistory: initialStateMentalHealthHistory,
  mentalHealthLearning: initialStateMentalHealthLearning,
  mentalHealthPlayback: initialStateMentalHealthPlayback,
  mentalHealthState: initialStateMentalHealth,
  mentalHealthSupport: initialStateMentalHealthSupport,
  onboarding: initialStateOnboarding,
  reconsent: initialStateReconsent,
  school: initialStateSchools,
  settings: initialStateSettings,
  studyHub: initialStateStudyHub,
  testingMode: initialStateTestingMode,
  user: initialStateUser,
  vaccines: initialStateVaccine,
};
