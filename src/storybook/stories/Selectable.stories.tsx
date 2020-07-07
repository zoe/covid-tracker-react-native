import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { Selectable, FOOD_INTAKE_FREQUENCY } from '@covid/components/Inputs/Selectable';

import { PaddingView } from '../decorator';

const ValueChangeHandler = (): HandlerFunction => action('selectable-item-selected');

storiesOf('Selectable', module)
  .addDecorator(PaddingView)
  .add('default view', () => <Selectable items={FOOD_INTAKE_FREQUENCY()} onSelected={ValueChangeHandler()} />);
