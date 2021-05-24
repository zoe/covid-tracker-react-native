import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';
import { IMentalHealthPlayback, IInsightsDict } from '@covid/core/state/mental-health-playback/types';
import { IInsight } from '@covid/types/mental-health-playback';
import store from '@covid/core/state/store';
import { mentalHealthApiClient } from '@covid/Services';

const initialState: IMentalHealthPlayback = {
  insights: [],
  loading: false,
};

const slice = createSlice({
  name: 'MentalHealthPlayback',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<IInsight[]>) => ({
      ...state,
      insights: action.payload,
    }),
    isLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const selectInsights = (state: RootState) => state.mentalHealthPlayback.insights;
export const selectInsightsByName = (state: RootState) =>
  state.mentalHealthPlayback.insights.reduce((map: IInsightsDict, insight: IInsight) => {
    map[insight.activity_name] = insight;
    return map;
  }, {});
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
