import { longCovidQuestionPageOneDataInitialState } from '@covid/features/long-covid/screens/consts.questions';
import { LongCovidQuestionPageOneData } from '@covid/features/long-covid/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';

const initialState: LongCovidQuestionPageOneData = longCovidQuestionPageOneDataInitialState;

const longCovidSlice = createSlice({
  initialState,
  name: 'longCovidState',
  reducers: {
    setlongCovid: (state, action: PayloadAction<LongCovidQuestionPageOneData>) => {
      return {
        ...state,
        ...action.payload, // Replace the whole obj wholesale as currently a 1-page form
      };
    },
  },
});

export const { setlongCovid } = longCovidSlice.actions;
export const selectlongCovid = (state: RootState) => state.longCovid;
export default longCovidSlice.reducer;
