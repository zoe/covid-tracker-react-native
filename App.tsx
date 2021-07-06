import 'reflect-metadata';

import { MessageProvider } from '@covid/common';
import { MessagingContainer } from '@covid/components';
import { ErrorBoundary } from '@covid/core/ErrorBoundary';
import store, { persistor } from '@covid/core/state/store';
import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';
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

const ENABLE_STORYBOOK = false;

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
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  return (
    <ErrorBoundary>
      <MessageProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <SafeAreaProvider>
                <MessagingContainer />
                {loaded ? <Root /> : null}
              </SafeAreaProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </MessageProvider>
    </ErrorBoundary>
  );
}
