import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';

import { IUser } from '../types';

const initialState: IUser = {
  email: '',
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    reset: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { reset } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
