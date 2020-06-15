import React from 'react';
import { PickerItemProps } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import DropdownField from '@covid/components/DropdownField';

const DropdownOptionsFactory = (labels: string[]): PickerItemProps[] => {
  return labels.map((label, index) => ({
    testID: `test-id-${index}`,
    label,
    value: `value-${index}`,
  }));
};

const SingleLineItems = DropdownOptionsFactory(['Example value', 'Example value 2']);

const MultiLineItems = DropdownOptionsFactory([
  'This is a super long text to test multi line dropdown item',
  'This is another super long text to test multi line dropdown item',
]);

const ValueChangeHandler = (): HandlerFunction => action('dropdown-item-selected');

storiesOf('DropdownField', module).add('default view', () => (
  <DropdownField
    selectedValue={null}
    onValueChange={ValueChangeHandler()}
    label="Test Label"
    items={SingleLineItems}
    error={false}
  />
));

storiesOf('DropdownField', module).add('multi lines items', () => (
  <DropdownField
    selectedValue={null}
    onValueChange={ValueChangeHandler()}
    label="Test Label"
    items={MultiLineItems}
    error={false}
  />
));

storiesOf('DropdownField', module).add('no default items', () => (
  <DropdownField selectedValue={null} onValueChange={ValueChangeHandler()} label="Test Label" error />
));

storiesOf('DropdownField', module).add('with default value', () => (
  <DropdownField
    selectedValue={SingleLineItems[0].value}
    onValueChange={ValueChangeHandler()}
    label="Test Label"
    items={SingleLineItems}
    error={false}
  />
));

storiesOf('DropdownField', module).add('with error', () => (
  <DropdownField
    selectedValue={null}
    onValueChange={ValueChangeHandler()}
    label="Test Label"
    items={MultiLineItems}
    error
  />
));
