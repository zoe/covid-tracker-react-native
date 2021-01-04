import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import rootReducer from '@covid/core/state/root';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
