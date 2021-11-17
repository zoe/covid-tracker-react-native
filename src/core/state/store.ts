import rootReducer from '@covid/core/state/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { LogBox } from 'react-native';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const persistConfig = {
  blacklist: ['app'],
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// This middleware only runs in development mode of the app so it's safe to ignore the warning.
LogBox.ignoreLogs(['ImmutableStateInvariantMiddleware took']);

const store = configureStore({
  devTools: __DEV__,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
