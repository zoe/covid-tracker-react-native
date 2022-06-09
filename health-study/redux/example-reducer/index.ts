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
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    resetState: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { increment, decrement, incrementByAmount, resetState } = exampleSlice.actions;

export default exampleSlice.reducer;
