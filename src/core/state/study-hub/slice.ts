import { TRootState } from '@covid/core/state/root';
import { EInteraction, TStateStudyHub, TUpdateStudyInterestAction } from '@covid/core/state/study-hub/types';
import { studyInterestService } from '@covid/core/study-interest/StudyInterestService';
// We have hardcoded the studies data on the frontend because at this stage it's
// not clear how the future of the study hub will look like. For example, how many
// studies will be added / updated / removed in a certain time period. Once this is
// more clear it's better to go for a full backend approach and remove the hardcoded
// content from the frontend.
import { studies as studiesFrontend } from '@covid/features/study-hub/data/studies';
import { EStudyKey } from '@covid/features/study-hub/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export const initialStateStudyHub: TStateStudyHub = {
  studies: {},
  studyHubInteractions: [],
};

export const fetchStudySummary = createAsyncThunk('study_interest/fetch_study_summary', async (patientId: string) => {
  const response = await studyInterestService.getSummary(patientId);
  return response.reduce((json, study) => Object.assign(json, { [study.key]: study }), {});
});

export const studyHubSlice = createSlice({
  extraReducers(builder) {
    builder.addCase(fetchStudySummary.fulfilled, (state, action) => {
      const studies = Object.keys(action.payload).reduce((obj, studyKey) => {
        return {
          ...obj,
          [studyKey]: {
            ...studiesFrontend[studyKey as EStudyKey],
            ...action.payload[studyKey],
          },
        };
      }, {});
      state.studies = studies;
    });
  },
  initialState: initialStateStudyHub,
  name: 'StudyHub',
  reducers: {
    addStudyHubInteraction: (state, action: PayloadAction<EInteraction>) => {
      state.studyHubInteractions.push({
        interaction: action.payload,
        timestamp: Date.now(),
      });
    },
    updateStudyInterest: (state, action: PayloadAction<TUpdateStudyInterestAction>) => {
      state.studies[action.payload.studyKey].patient_is_interested = action.payload.patientIsInterested;
    },
  },
});

export const selectShouldShowFeedbackModal = (state: TRootState) => {
  if (state.content.startupInfo?.show_study_hub_feedback) {
    // The modal should be shown to the user if one of the following criteria is met:
    // - User has shown interest to two studies or more
    // - User has interacted with the study hub for 10 times or more
    // - Between the first and last interaction there is 1 month difference or more

    if (state.studyHub.studyHubInteractions.length >= 10) {
      return true;
    }

    const shownInterestTwoStudies = state.studyHub.studyHubInteractions.filter(
      (studyHubInteraction) => studyHubInteraction.interaction === EInteraction.SHOW_INTEREST,
    );
    if (shownInterestTwoStudies.length >= 2) {
      return true;
    }

    if (state.studyHub.studyHubInteractions.length >= 2) {
      const startMoment = moment(state.studyHub.studyHubInteractions[0].timestamp);
      const endMoment = moment(
        state.studyHub.studyHubInteractions[state.studyHub.studyHubInteractions.length - 1].timestamp,
      );
      if (startMoment.diff(endMoment, 'months') >= 1) {
        return true;
      }
    }
  }

  return false;
};

export const selectShouldShowReconsentModal = (state: TRootState) => {
  if (state.content.startupInfo?.wider_health_studies_consent) {
    return false;
  }
  return true;
};

export const selectStudiesList = (state: TRootState) => {
  return Object.values(state.studyHub.studies).sort((studyA, studyB) =>
    studyA.orderIndex > studyB.orderIndex ? 1 : -1,
  );
};
