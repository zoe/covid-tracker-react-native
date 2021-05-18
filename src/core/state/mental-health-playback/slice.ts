import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';
import { IMentalHealthPlayback, IInsightsDict } from '@covid/core/state/mental-health-playback/types';
import { IInsight } from '@covid/types/mental-health-playback';

// @todo
const insights: IInsight[] = [
  {
    activity_name: 'sleeping_well_less',
    answers: [
      {
        title: 'No change',
        value: 0.46,
        label: '46%',
      },
      {
        title: 'less',
        value: 0.37,
        label: '37%',
      },
      {
        title: 'more',
        value: 0.17,
        label: '17%',
      },
    ],
    correlated_activities: [
      'sleeping_well_less',
      'interacting_face_to_face_with_family_friends_less',
      'smoking_or_vaping_less',
    ],
    direction: 'higher',
    level_of_association: 'strongly',
    segment: 'age: 60, women',
  },
  {
    activity_name: 'interacting_face_to_face_with_family_friends_less',
    answers: [
      {
        title: 'No change',
        value: 0.46,
        label: '46%',
      },
      {
        title: 'less',
        value: 0.37,
        label: '37%',
      },
      {
        title: 'more',
        value: 0.17,
        label: '17%',
      },
    ],
    correlated_activities: [
      'sleeping_well_less',
      'interacting_face_to_face_with_family_friends_less',
      'smoking_or_vaping_less',
    ],
    direction: 'higher',
    level_of_association: 'strongly',
    segment: 'age: 60, women',
  },
  {
    activity_name: 'smoking_or_vaping_less',
    answers: [
      {
        title: 'No change',
        value: 0.46,
        label: '46%',
      },
      {
        title: 'less',
        value: 0.37,
        label: '37%',
      },
      {
        title: 'more',
        value: 0.17,
        label: '17%',
      },
    ],
    correlated_activities: [
      'sleeping_well_less',
      'interacting_face_to_face_with_family_friends_less',
      'smoking_or_vaping_less',
    ],
    direction: 'higher',
    level_of_association: 'strongly',
    segment: 'age: 60, women',
  },
  {
    activity_name: 'using_devices_with_a_screen_more',
    answers: [
      {
        title: 'No change',
        value: 0.46,
        label: '46%',
      },
      {
        title: 'less',
        value: 0.37,
        label: '37%',
      },
      {
        title: 'more',
        value: 0.17,
        label: '17%',
      },
    ],
    correlated_activities: [
      'sleeping_well_less',
      'interacting_face_to_face_with_family_friends_less',
      'smoking_or_vaping_less',
    ],
    direction: 'higher',
    level_of_association: 'strongly',
    segment: 'age: 60, women',
  },
];

const initialState: IMentalHealthPlayback = {
  insights,
};

const mentalHealthPlaybackSlice = createSlice({
  name: 'MentalHealthPlayback',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<IInsight[]>) => ({
      ...state,
      insights: action.payload,
    }),
  },
});

export const { setInsights } = mentalHealthPlaybackSlice.actions;
// @todo
// export const selectInsights = (state: RootState) => state.mentalHealthPlayback.insights;
export const selectInsights = () => insights;
// export const selectInsightsByName = (state: RootState) =>
//   state.mentalHealthPlayback.insights.reduce((map: IInsightsDict, insight: IInsight) => {
//     map[insight.activity_name] = insight;
//     return map;
//   }, {});
export const selectInsightsByName = (state: RootState) =>
  insights.reduce((map: IInsightsDict, insight: IInsight) => {
    map[insight.activity_name] = insight;
    return map;
  }, {});
export default mentalHealthPlaybackSlice.reducer;
