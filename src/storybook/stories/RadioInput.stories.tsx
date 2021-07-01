import { RadioInput } from '@covid/components/inputs/RadioInput';
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

storiesOf('RadioInput', module).add('default view', () => (
  <RadioInput items={SingleLineItems} label="Test Label" onValueChange={ValueChangeHandler()} selectedValue={null} />
));

storiesOf('RadioInput', module).add('multi lines items', () => (
  <RadioInput items={MultiLineItems} label="Test Label" onValueChange={ValueChangeHandler()} selectedValue={null} />
));

storiesOf('RadioInput', module).add('no default items', () => (
  // @ts-expect-error
  <RadioInput error="Test error" label="Test Label" onValueChange={ValueChangeHandler()} selectedValue={null} />
));

storiesOf('RadioInput', module).add('with default value', () => (
  <RadioInput
    items={SingleLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={SingleLineItems[0].value}
  />
));

storiesOf('RadioInput', module).add('with error', () => (
  <RadioInput
    error="Test error"
    items={MultiLineItems}
    label="Test Label"
    onValueChange={ValueChangeHandler()}
    selectedValue={null}
  />
));
