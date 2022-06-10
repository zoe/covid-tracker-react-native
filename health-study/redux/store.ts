import { configureStore } from '@reduxjs/toolkit';

import app from './app';
import example from './reducer-template';
import settings from './settings';
// import new reducers here and ref them below

export const store = configureStore({
  reducer: { app, example, settings },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
