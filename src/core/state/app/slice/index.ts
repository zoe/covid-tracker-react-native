import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { IApp } from '../types';

const initialState: IApp = {
  dashboardVisited: false,
};

const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setDasboardVisited: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        dashboardVisited: action.payload,
      };
    },
    reset: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setDasboardVisited, reset } = appSlice.actions;
export const selectApp = (state: RootState) => state.app;
export default appSlice.reducer;
