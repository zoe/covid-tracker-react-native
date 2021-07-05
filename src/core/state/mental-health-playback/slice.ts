import { IMentalHealthPlayback } from '@covid/core/state/mental-health-playback/types';
import { RootState } from '@covid/core/state/root';
import store from '@covid/core/state/store';
import { IMHInsights } from '@covid/features/mental-health-playback/types';
import { mentalHealthApiClient } from '@covid/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthPlayback: IMentalHealthPlayback = {
  loading: false,
  mh_insights: {
    completed_feedback: false,
    insights: [],
  },
};

const slice = createSlice({
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

export const selectInsights = (state: RootState) => state.mentalHealthPlayback.mh_insights;
export const isLoading = (state: RootState) => state.mentalHealthPlayback.loading;
export function requestInsights() {
  return async (dispatch: typeof store.dispatch) => {
    dispatch(slice.actions.isLoading(true));
    try {
      const insights = await mentalHealthApiClient.getInsights();
      dispatch(slice.actions.setInsights(insights));
    } catch (_) {}
    dispatch(slice.actions.isLoading(false));
  };
}

export default slice.reducer;
