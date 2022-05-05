import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import Slider from '@tracer/components/molecules/Slider';
import React from 'react';

import { CenterView } from '../CenterView';

storiesOf('Slider', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('single label', () => (
    <Slider
      name="index"
      onSelect={action(`triggered`)}
      options={[
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
        { label: 'three', value: 3 },
        { label: 'four', value: 4 },
      ]}
      title="Select frequency"
    />
  ));
