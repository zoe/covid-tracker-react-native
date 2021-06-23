import DropdownField from '@covid/components/DropdownField';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { PickerItemProps } from 'react-native';

const DropdownOptionsFactory = (labels: string[]): PickerItemProps[] => {
  return labels.map((label, index) => ({
    label,
    testID: `test-id-${index}`,
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
    error={false}
    items={SingleLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={null}
  />
));

storiesOf('DropdownField', module).add('multi lines items', () => (
  <DropdownField
    error={false}
    items={MultiLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={null}
  />
));

storiesOf('DropdownField', module).add('no default items', () => (
  <DropdownField error label="Test Label" onValueChange={ValueChangeHandler()} selectedValue={null} />
));

storiesOf('DropdownField', module).add('with default value', () => (
  <DropdownField
    error={false}
    items={SingleLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={SingleLineItems[0].value}
  />
));

storiesOf('DropdownField', module).add('with error', () => (
  <DropdownField
    error
    items={MultiLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={null}
  />
));
