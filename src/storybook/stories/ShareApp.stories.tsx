import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { ShareAppCard } from '@covid/components/Cards/ShareApp';
import { ShareAppCardViral } from '@covid/components/Cards/ShareAppViral';

const Handler = (): HandlerFunction => action('share-button-on-pressed');

storiesOf('ShareApp', module)
  .add('Normal (action)', () => <ShareAppCard onSharePress={Handler()} />)
  .add('Viral (action)', () => <ShareAppCardViral area={null} onSharePress={Handler()} />)
  .add('Normal (share)', () => <ShareAppCard />)
  .add('Viral (share)', () => <ShareAppCardViral area={null} />);
