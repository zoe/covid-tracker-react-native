import 'reflect-metadata';

import { MessageProvider } from '@covid/common';
import { MessagingContainer } from '@covid/components';
import { ErrorBoundary } from '@covid/core/ErrorBoundary';
import store, { persistor } from '@covid/core/state/store';
import CovidApp from '@covid/CovidApp';
import { container } from '@covid/provider/services';
import { Provider as ServiceProvider } from '@covid/provider/services.provider';
import StorybookUIRoot from '@covid/storybook';
import { Theme } from '@covid/themes';
import { useFonts } from 'expo-font';
import React from 'react';
import env from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components';

const ENABLE_STORYBOOK = false;

Sentry.init({
  debug: false,
  dsn: env.SENTRY_DSN_URL,
  enableAutoSessionTracking: false,
  enableInExpoDevelopment: false,
  environment: env.NAME,
});

const App: React.FC = () => {
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  SplashScreen.hide();
  const [loaded] = useFonts({
    icomoon: require('./assets/fonts/icomoon.ttf'),
  });
  return (
    <ErrorBoundary>
      <MessageProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={Theme}>
              <SafeAreaProvider>
                <MessagingContainer />
                <ServiceProvider container={container}>{loaded ? <Root /> : null}</ServiceProvider>
              </SafeAreaProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </MessageProvider>
    </ErrorBoundary>
  );
};

export default App;
