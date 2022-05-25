import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
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
          text: 'One',
        },
        {
          buttonType: 'secondary',
          onPress: action('clicked-button-two'),
          text: 'Two',
        },
      ]}
      {...componentProps}
    />
  ));
