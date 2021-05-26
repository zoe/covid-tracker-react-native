import { RootState } from '@covid/core/state/root';
import { IUser } from '@covid/core/state/user/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser = {
  ask_for_rating: false,
  authorizations: [],
  country_code: '',
  is_tester: false,
  language_code: '',
  patients: [],
  pii: '',
  push_tokens: [],
  username: '',
};

const userSlice = createSlice({
  initialState,
  name: 'User',
  reducers: {
    reset: () => {
      return {
        ...initialState,
      };
    },
    setPatients: (state, action: PayloadAction<string[]>) => {
      state.patients = action.payload;
    },
    setProfile: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { reset, setProfile, setUsername, setPatients } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
