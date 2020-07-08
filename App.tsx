import 'reflect-metadata';
import React from 'react';

import CovidApp from '@covid/CovidApp';
import StorybookUIRoot from '@covid/storybook';
import { Provider } from '@covid/provider/services.provider';
import { container } from '@covid/provider/services';

const ENABLE_STORYBOOK = true;

const App: React.FC = () => {
  const Root = ENABLE_STORYBOOK ? StorybookUIRoot : CovidApp;
  return (
    <Provider container={container}>
      <Root />
    </Provider>
  );
};

export default App;
