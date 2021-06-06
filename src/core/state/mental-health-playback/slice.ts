import { IMentalHealthPlayback } from '@covid/core/state/mental-health-playback/types';
import { RootState } from '@covid/core/state/root';
import store from '@covid/core/state/store';
import { mentalHealthApiClient } from '@covid/Services';
import { IMHInsights } from '@covid/types/mental-health-playback';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IMentalHealthPlayback = {
  loading: false,
  mh_insights: {
    completed_feedback: false,
    insights: [],
  },
};

const slice = createSlice({
  initialState,
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
    const insights = await mentalHealthApiClient.getInsights();
    dispatch(slice.actions.setInsights(insights));
    dispatch(slice.actions.isLoading(false));
  };
}

export default slice.reducer;
