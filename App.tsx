import 'reflect-metadata';
import React from 'react';
import { Provider } from 'react-redux';

import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';
import { Provider as ServiceProvider } from '@covid/provider/services.provider';
import { container } from '@covid/provider/services';
import store from '@covid/core/state/store';

const ENABLE_STORYBOOK = false;

const App: React.FC = () => {
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  return (
    <Provider store={store}>
      <ServiceProvider container={container}>
        <Root />
      </ServiceProvider>
    </Provider>
  );
};

export default App;
