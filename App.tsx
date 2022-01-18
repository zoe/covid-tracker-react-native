import { ErrorBoundary } from '@covid/core/ErrorBoundary';
import store, { persistor } from '@covid/core/state/store';
import CovidApp from '@covid/CovidApp';
import { theme } from '@covid/themes';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { LogBox } from 'react-native';
import env from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components/native';

Sentry.init({
  debug: false,
  dsn: env.SENTRY_DSN_URL,
  enableAutoSessionTracking: false,
  enableInExpoDevelopment: false,
  environment: env.NAME,
});

export default function App() {
  const [loaded] = useFonts({
    icomoon: require('./assets/fonts/icomoon.ttf'),
  });
  React.useEffect(() => {
    // For e2e testing it's important that no overlaying warnings/errors are present in the view hierarchy.
    LogBox.ignoreAllLogs();
  }, []);
  SplashScreen.hide();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>{loaded ? <CovidApp /> : null}</SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
