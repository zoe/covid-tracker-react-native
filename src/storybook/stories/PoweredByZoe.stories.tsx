import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { PoweredByZoe } from '@covid/components/PoweredByZoe';
import { CenterView, DarkBackground } from '@covid/storybook/decorator';

storiesOf('PoweredByZoe', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('default view', () => <PoweredByZoe />);
