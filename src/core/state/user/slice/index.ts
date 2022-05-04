import { TPatientData } from '@covid/core/patient/PatientData';
import { TRootState } from '@covid/core/state/root';
import { TStateUser } from '@covid/core/state/user/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateUser: TStateUser = {
  ask_for_rating: false,
  authorizations: [],
  country_code: '',
  currentPatient: {} as TPatientData,
  is_tester: false,
  language_code: '',
  patients: [],
  pii: '',
  push_tokens: [],
  username: '',
};

const userSlice = createSlice({
  initialState: initialStateUser,
  name: 'User',
  reducers: {
    reset: () => {
      return initialStateUser;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.country_code = action.payload;
    },
    setCurrentPatient: (state, action: PayloadAction<TPatientData>) => {
      state.currentPatient = action.payload;
    },
    setPatients: (state, action: PayloadAction<string[]>) => {
      state.patients = action.payload;
    },
    setProfile: (state, action: PayloadAction<TStateUser>) => {
      state = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { reset, setProfile, setUsername, setCountryCode, setCurrentPatient, setPatients } = userSlice.actions;
export const selectUser = (state: TRootState) => state.user;

export default userSlice.reducer;
