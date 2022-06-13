/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExampleState } from './types';

const initialState: ExampleState = {
  value: 0,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    action: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetState: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { action, resetState } = exampleSlice.actions;

export default exampleSlice.reducer;
