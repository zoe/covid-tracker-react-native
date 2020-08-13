import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/UKEstimatedCaseCard';

const ValueChangeHandler = (): HandlerFunction => action('cta on press');

storiesOf('EstimatedCaseCard', module).add('uk', () => (
  <UKEstimatedCaseCard leftMertric="0" rightMetric="0" onPress={ValueChangeHandler} />
));
