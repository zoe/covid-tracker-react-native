import { UKEstimatedCaseCard } from '@covid/components/cards/estimated-case/UKEstimatedCaseCard';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

const ValueChangeHandler = (): HandlerFunction => action('cta on press');

storiesOf('EstimatedCaseCard', module).add('uk', () => (
  <UKEstimatedCaseCard leftMertric="0" onPress={ValueChangeHandler} rightMetric="0" />
));
