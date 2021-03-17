import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { ShareAppCard } from '@covid/components/Cards/ShareApp';

const Handler = (): HandlerFunction => action('share-button-on-pressed');

storiesOf('ShareApp', module)
  .add('Normal (action)', () => <ShareAppCard onSharePress={Handler()} />)
  .add('Normal (share)', () => <ShareAppCard />);
