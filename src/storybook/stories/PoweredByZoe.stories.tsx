import { PoweredByZoe } from '@covid/components/logos/PoweredByZoe';
import { CenterView, DarkBackground } from '@covid/storybook/decorator';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

storiesOf('PoweredByZoe', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('default view', () => <PoweredByZoe />);
