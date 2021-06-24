import { YesNoField } from '@covid/components/YesNoField';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

const ValueChangeHandler = (): HandlerFunction => action('yes-no-button-selected');

storiesOf('YesNoField', module).add('default view', () => (
  <YesNoField label="Test Label" onValueChange={ValueChangeHandler()} selectedValue="no" />
));
