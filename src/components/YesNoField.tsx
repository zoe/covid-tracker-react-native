import i18n from '@covid/locale/i18n';
import React from 'react';
import { PickerProps } from 'react-native';

import { ButtonsGroup, ISingleButton } from './inputs/ButtonsGroup';

interface IProps {
  error?: any;
  label?: string;
  onValueChange: any;
  onlyPicker?: boolean;
  pickerProps?: PickerProps;
  selectedValue: string;
  testID?: string;
}

const Items = (): ISingleButton[] => [
  {
    label: i18n.t('picker-no'),
    value: 'no',
  },
  {
    label: i18n.t('picker-yes'),
    value: 'yes',
  },
];

export function YesNoField({ label, onValueChange, ...props }: IProps) {
  return <ButtonsGroup items={Items()} label={label} onValueChange={onValueChange} {...props} />;
}

export default YesNoField;
