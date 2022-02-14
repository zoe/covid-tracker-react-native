/* eslint-env jest */

import { MAX_STEPS_FEMALE } from '@covid/features/health-profile/data/healthProfileNavigator';

import store from '../../store';
import {
  fetchExistingHealthProfile,
  resetHealthProfile,
  THealthProfileScreenNames,
  TStateHealthProfile,
  updateHasSeenAboutYouTooltip,
  updateHasSeenHealthProfileReminderModal,
  updateHealthProfile,
  updateHealthProfileProgress,
} from '../slice';

const patientId = 'test123';

const patientResponse = { patientInfo: { gender: 0, year_of_birth: '2000' } };

const initialState: TStateHealthProfile = {
  answers: {},
  dateOfLastUpdate: null,
  hasSeenAboutYouTooltip: false,
  hasSeenReminderModal: false,
  maxSteps: MAX_STEPS_FEMALE,
  progressPercent: 0,
  screenToReturnTo: 'HPAboutYou',
  stepsCompleted: 0,
};

const healthProfileProgress = {
  dateOfLastUpdate: new Date(),
  maxSteps: 16,
  progressPercent: 14,
  screenToReturnTo: 'HPYourBehaviours' as THealthProfileScreenNames,
  stepsCompleted: 2,
};

jest.mock('@covid/core/patient/PatientService', () => ({
  patientService: {
    getPatientDataById: jest.fn().mockImplementation(() => {
      return Promise.resolve(patientResponse);
    }),
  },
}));

describe('Health Profile redux state tests', () => {
  it('should initially set answers to empty object', () => {
    const state = store.getState().healthProfile;
    expect(state.answers).toEqual({});
  });

  it('should be able to fetch patient profile and set health profile answers for overlapping questions', async () => {
    const result = await store.dispatch<any>(fetchExistingHealthProfile(patientId));
    const patientProfile = result.payload;

    expect(result.type).toBe('health_profile/fetch_health_profile/fulfilled');

    const healthProfileAnswers = patientResponse.patientInfo;
    expect(patientProfile).toEqual(healthProfileAnswers);

    const state = store.getState().healthProfile;
    expect(state).toEqual({
      ...initialState,
      answers: healthProfileAnswers,
    });
  });

  it('should be able to reset the state', async () => {
    store.dispatch(resetHealthProfile());
    const state = store.getState().healthProfile;

    expect(state).toEqual(initialState);
  });

  it('should be able to update the Health Profile answers', () => {
    store.dispatch(
      updateHealthProfile({
        is_twin: true,
      }),
    );
    const state = store.getState().healthProfile;
    expect(state.answers).toEqual({ is_twin: true });
  });

  it('should be able to update the Health Profile progress', () => {
    store.dispatch(updateHealthProfileProgress(healthProfileProgress));
    const state = store.getState().healthProfile;
    expect(state.maxSteps).toEqual(16);
    expect(state.progressPercent).toEqual(14);
    expect(state.screenToReturnTo).toEqual('HPYourBehaviours');
    expect(state.stepsCompleted).toEqual(2);
  });

  it('should be able to update whether the tooltip has been seen', () => {
    store.dispatch(updateHasSeenAboutYouTooltip(true));
    const state = store.getState().healthProfile;
    expect(state.hasSeenAboutYouTooltip).toEqual(true);
  });

  it('should be able to update whether the reminder modal has been seen', () => {
    store.dispatch(updateHasSeenHealthProfileReminderModal(true));
    const state = store.getState().healthProfile;
    expect(state.hasSeenReminderModal).toEqual(true);
  });
});
