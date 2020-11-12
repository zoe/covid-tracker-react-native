import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { YesNoField } from '@covid/components/YesNoField';

const ValueChangeHandler = (): HandlerFunction => action('yes-no-button-selected');

storiesOf('YesNoField', module).add('default view', () => (
  <YesNoField selectedValue="no" onValueChange={ValueChangeHandler()} label="Test Label" />
));
