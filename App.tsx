import 'reflect-metadata';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';
import { Provider as ServiceProvider } from '@covid/provider/services.provider';
import { container } from '@covid/provider/services';
import store from '@covid/core/state/store';
import { Theme } from '@covid/themes';
import { MessagingContainer } from '@covid/components';

const ENABLE_STORYBOOK = false;

const App: React.FC = () => {
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <SafeAreaProvider>
          <MessagingContainer />
          <ServiceProvider container={container}>
            <Root />
          </ServiceProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
