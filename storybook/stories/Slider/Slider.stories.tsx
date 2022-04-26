import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Slider from '../../components/molecules/Slider/Slider';
import { CenterView } from '../CenterView';

storiesOf('Slider', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('single label', () => (
    <Slider
      name="slider one"
      options={[
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
        { label: 'three', value: 3 },
        { label: 'four', value: 4 },
      ]}
    />
  ));
