import { initialStateAssessment } from '@covid/core/assessment/state/reducers';
import { initialStateApp } from '@covid/core/state/app/slice';
import { initialStateContent } from '@covid/core/state/content/slice';
import { initialStateDietStudy } from '@covid/core/state/diet-study/slice';
import { initialStateHealthProfile } from '@covid/core/state/health-profile/slice';
import { initialStateMediaCentre } from '@covid/core/state/media-centre';
import { initialStateMentalHealthPlayback } from '@covid/core/state/mental-health-playback/slice';
import { initialStateOnboarding } from '@covid/core/state/onboarding/slice';
import { initialStateReconsent } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import { initialStateSettings } from '@covid/core/state/settings/slice';
import { initialStateStudyHub } from '@covid/core/state/study-hub/slice';
import { initialStateTestingMode } from '@covid/core/state/testingMode';
import { initialStateUser } from '@covid/core/state/user/slice';
import { initialStateVaccine } from '@covid/core/state/vaccines/slice';

export const initialState: TRootState = {
  app: initialStateApp,
  assessment: initialStateAssessment,
  content: initialStateContent,
  dietStudy: initialStateDietStudy,
  healthProfile: initialStateHealthProfile,
  mediaCentre: initialStateMediaCentre,
  mentalHealthPlayback: initialStateMentalHealthPlayback,
  onboarding: initialStateOnboarding,
  reconsent: initialStateReconsent,
  settings: initialStateSettings,
  studyHub: initialStateStudyHub,
  testingMode: initialStateTestingMode,
  user: initialStateUser,
  vaccines: initialStateVaccine,
};
