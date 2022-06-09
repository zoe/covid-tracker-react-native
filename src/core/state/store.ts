import rootReducer from '@covid/core/state/root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { LogBox } from 'react-native';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  blacklist: ['onboarding'],
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// This middleware only runs in development mode of the app so it's safe to ignore the warning.
LogBox.ignoreLogs(['ImmutableStateInvariantMiddleware took']);

const store = configureStore({
  devTools: __DEV__,
  middleware: getDefaultMiddleware({
    // @todo: Add the onboarding actions to this
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
    serializableCheck: false,
  }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
