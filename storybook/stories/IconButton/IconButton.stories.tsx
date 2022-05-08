import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';

import IconButton, { IIconButtonProps } from '../../components/molecules/IconButton';
import { CenterView } from '../CenterView';

const componentProps: IIconButtonProps = {
  style: { width: 300 },
};

storiesOf('Molecules/IconButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <IconButton {...componentProps}>
      <Text>{text('IconButton text', 'IconButton')}</Text>
    </IconButton>
  ));
