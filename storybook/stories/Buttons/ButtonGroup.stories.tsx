import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { grid } from '@tracer/branding/grid';
import ButtonGroup, { IButtonGroupProps } from '@tracer/components/molecules/Button/group';
import React from 'react';

import { CenterView } from '../CenterView';

const componentProps: IButtonGroupProps = {
  style: { width: 300 },
};

storiesOf('Molecules/Buttons', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <ButtonGroup
      buttonProps={[
        {
          buttonType: 'primary',
          onPress: action('clicked-button-one'),
          style: { borderRadius: grid.g4, height: grid.g48, padding: grid.g12, width: 132 },
          text: 'One',
        },
        {
          buttonType: 'secondary',
          onPress: action('clicked-button-two'),
          style: { borderRadius: grid.g4, height: grid.g48, padding: grid.g12, width: 132 },
          text: 'Two',
        },
      ]}
      {...componentProps}
    />
  ));
