import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';

import { IUser } from '../types';

const initialState: IUser = {
  email: '',
  username: '',
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
    setUsername: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        username: action.payload,
      };
    },
  },
});

export const { reset, setUsername } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
