import { BrandedButton } from '@covid/components';
import { ClearButton } from '@covid/components/buttons/ClearButton';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

const Handler = (): HandlerFunction => action('on-pressed');

const Story = 'buttons';

storiesOf(Story, module)
  .add('Clear', () => <ClearButton onPress={Handler()} text="Hello" />)
  .add('Branded', () => <BrandedButton onPress={Handler()}>Hello</BrandedButton>);
