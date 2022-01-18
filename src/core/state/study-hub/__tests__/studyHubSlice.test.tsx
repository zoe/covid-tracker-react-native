/* eslint-env jest */

import ApiClient from '@covid/core/api/ApiClient';
import { EStudyKey } from '@covid/features/study-hub/types';
import MockAdapter from 'axios-mock-adapter';

import store from '../../store';
import { fetchStudySummary, studyHubSlice } from '../slice';
import { EInteraction } from '../types';

const patientId = 'test123';
const getSummaryResponse = [
  {
    id: 'test_id_1',
    interest_count: 0,
    key: 'study_1',
    patient_is_interested: false,
  },
];

const apiClient = new ApiClient();

const mockNetworkResponse = () => {
  const mock = new MockAdapter(apiClient.getClient());
  mock.onGet(`/study_interest/summary/?patient_id=${patientId}`).reply(200, getSummaryResponse);
};

describe('Study Hub redux state tests', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });

  it('should initially set studies to empty object', () => {
    const state = store.getState().studyHub;
    expect(state.studies).toEqual({});
  });

  it('should be able to fetch study summary', async () => {
    const result = await store.dispatch<any>(fetchStudySummary(patientId));
    const studies = result.payload;

    expect(result.type).toBe('study_interest/fetch_study_summary/fulfilled');
    expect(studies.study_1).toEqual(getSummaryResponse[0]);

    const state = store.getState().studyHub;
    expect(state).toEqual({
      studies,
      studyHubInteractions: [],
    });
  });

  it('should be able to toggle interest for a specific study', async () => {
    await store.dispatch<any>(fetchStudySummary(patientId));
    store.dispatch(
      studyHubSlice.actions.updateStudyInterest({
        patientIsInterested: true,
        studyKey: 'study_1' as EStudyKey,
      }),
    );
    let state = store.getState().studyHub;
    // @ts-ignore
    expect(state.studies.study_1.patient_is_interested).toBe(true);

    store.dispatch(
      studyHubSlice.actions.updateStudyInterest({
        patientIsInterested: false,
        studyKey: 'study_1' as EStudyKey,
      }),
    );
    state = store.getState().studyHub;
    // @ts-ignore
    expect(state.studies.study_1.patient_is_interested).toBe(false);
  });

  it('should be able to add Study Hub interaction', () => {
    Date.now = jest.fn(() => 1637159262310);
    const username = 'test@test.com';

    store.dispatch(
      studyHubSlice.actions.addStudyHubInteraction({
        interaction: EInteraction.SHOW_INTEREST,
        username,
      }),
    );
    const state = store.getState().studyHub;
    expect(state.studyHubInteractions).toEqual([
      {
        interaction: EInteraction.SHOW_INTEREST,
        timestamp: 1637159262310,
        username,
      },
    ]);
  });
});
