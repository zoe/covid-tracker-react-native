import { configureStore } from '@reduxjs/toolkit';

import example from './reducer-template';
// import new reducers here and ref them on line 7

export const store = configureStore({
  reducer: { example },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
