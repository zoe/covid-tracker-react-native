import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

const Handler = (): HandlerFunction => action('share-button-on-pressed');

storiesOf('ShareApp', module)
  .add('Normal (action)', () => <ShareAppCard onSharePress={Handler()} />)
  .add('Normal (share)', () => <ShareAppCard />);
