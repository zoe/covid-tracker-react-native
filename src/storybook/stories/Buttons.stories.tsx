import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { HandlerFunction, action } from '@storybook/addon-actions';

import { ClearButton } from '@covid/components/Buttons/ClearButton';
import { BrandedButton } from '@covid/components/Text';

const Handler = (): HandlerFunction => action('on-pressed');

const Story = 'Buttons';

storiesOf(Story, module)
  .add('Clear', () => <ClearButton text="Hello" onPress={Handler()} />)
  .add('Branded', () => <BrandedButton onPress={Handler()}>Hello</BrandedButton>);
