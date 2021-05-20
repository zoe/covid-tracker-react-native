import { longCovidQuestionPageOneDataInitialState } from '@covid/features/long-covid/screens/consts.questions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { ILongCovid, ILongCovidState } from '../types';

const initialState: ILongCovidState = {
  profiles: []
};

const longCovidSlice = createSlice({
  initialState,
  name: 'longCovidState',
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setlongCovid: (state, action: PayloadAction<ILongCovid[]>) => {
      state.profiles = action.payload
    },
  },
});

export const { setlongCovid } = longCovidSlice.actions;
export const selectlongCovid = (state: RootState) => state.longCovid;
export default longCovidSlice.reducer;
