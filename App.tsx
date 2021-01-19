import 'reflect-metadata';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';
import { Provider as ServiceProvider } from '@covid/provider/services.provider';
import { container } from '@covid/provider/services';
import store, { persistor } from '@covid/core/state/store';
import { Theme } from '@covid/themes';
import { MessagingContainer } from '@covid/components';

const ENABLE_STORYBOOK = false;

const App: React.FC = () => {
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <SafeAreaProvider>
            <MessagingContainer />
            <ServiceProvider container={container}>
              <Root />
            </ServiceProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
