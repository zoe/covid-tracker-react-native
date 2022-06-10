import { TStateMentalHealthPlayback } from '@covid/core/state/mental-health-playback/types';
import { TRootState } from '@covid/core/state/root';
import store from '@covid/core/state/store';
import { getMentalHealthInsights } from '@covid/features/mental-health-playback/MentalHealthApiClient';
import { IMHInsights } from '@covid/features/mental-health-playback/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthPlayback: TStateMentalHealthPlayback = {
  loading: false,
  mh_insights: {
    completed_feedback: false,
    insights: [],
  },
};

export const mentalHealthPlaybackSlice = createSlice({
  initialState: initialStateMentalHealthPlayback,
  name: 'MentalHealthPlayback',
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    setInsights: (state, action: PayloadAction<IMHInsights>) => ({
      ...state,
      mh_insights: action.payload,
    }),
  },
});

export const selectInsights = (state: TRootState) => state.mentalHealthPlayback.mh_insights;
export const isLoading = (state: TRootState) => state.mentalHealthPlayback.loading;
export function requestInsights() {
  return async (dispatch: typeof store.dispatch) => {
    dispatch(mentalHealthPlaybackSlice.actions.isLoading(true));
    try {
      const insights = await getMentalHealthInsights();
      dispatch(mentalHealthPlaybackSlice.actions.setInsights(insights));
    } catch (_) {}
    dispatch(mentalHealthPlaybackSlice.actions.isLoading(false));
  };
}

export default mentalHealthPlaybackSlice.reducer;
