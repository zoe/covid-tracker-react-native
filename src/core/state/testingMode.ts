import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TStateTestingMode = {
  startupInfo: Partial<TStartupInfo>;
};

export const initialStateTestingMode: TStateTestingMode = {
  startupInfo: {},
};

type TUpdateStartupInfoAction = {
  key: keyof TStartupInfo;
  value: any;
};

export const testingModeSlice = createSlice({
  initialState: initialStateTestingMode,
  name: 'TestingMode',
  reducers: {
    updateStartupInfo: (state, action: PayloadAction<TUpdateStartupInfoAction>) => ({
      ...state,
      startupInfo: {
        ...state.startupInfo,
        [action.payload.key]: action.payload.value,
      },
    }),
  },
});

export const testingModeReducers = testingModeSlice.reducer;

export const testingModeActions = testingModeSlice.actions;
