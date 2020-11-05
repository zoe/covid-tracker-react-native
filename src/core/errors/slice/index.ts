import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';

export interface IError {
  active: boolean;
  errorList?: { [key: string]: string };
  errorStatus?: string;
  message?: string;
  variant?: 'top' | 'bottom';
}

const initialState: IError = {
  active: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IError>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = errorSlice.actions;
export const selectError = (state: RootState) => state.error;
export default errorSlice.reducer;
