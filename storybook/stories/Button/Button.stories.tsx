import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';

import BtnButton from '../../components/atoms/Button/BtnBranded';
import { CenterView } from '../CenterView';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <BtnButton onPress={action('clicked-text')}>
      <Text>{text('Button text', 'Hello Button')}</Text>
    </BtnButton>
  ));
