import 'reflect-metadata';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import { useFonts } from 'expo-font';
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
  const [fontsLoaded] = useFonts({
    sofiaProBlack: require('@assets/fonts/SofiaPro-Black.otf'),
    sofiaProBold: require('@assets/fonts/SofiaPro-Bold.otf'),
    sofiaProExtraLight: require('@assets/fonts/SofiaPro-ExtraLight.otf'),
    sofiaProLight: require('@assets/fonts/SofiaPro-Light.otf'),
    sofiaProMedium: require('@assets/fonts/SofiaPro-Medium.otf'),
    sofiaProSemiBold: require('@assets/fonts/SofiaPro-SemiBold.otf'),
    sofiaProUltraLight: require('@assets/fonts/SofiaPro-UltraLight.otf'),
    sofiaProRegular: require('@assets/fonts/SofiaProRegular.otf'),
  });
  SplashScreen.hide();
  // *** //
  // LogBox.ignoreAllLogs(true);
  // *** //
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <SafeAreaProvider>
          <MessagingContainer />
          <ServiceProvider container={container}>{fontsLoaded ? <Root /> : null}</ServiceProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
