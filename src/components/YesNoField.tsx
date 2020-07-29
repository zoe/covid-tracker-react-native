import React from 'react';
import { PickerProps } from 'react-native';

import i18n from '@covid/locale/i18n';

import ButtonsGroup, { ISingleButton } from './Inputs/ButtonsGroup';

interface YesNoFieldProps {
  selectedValue: string;
  onValueChange: any;
  label?: string;
  onlyPicker?: boolean;
  pickerProps?: PickerProps;
  error?: any;
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

export const YesNoField: React.FC<YesNoFieldProps> = ({ label, onValueChange, ...props }) => {
  return <ButtonsGroup label={label} items={Items()} onValueChange={onValueChange} {...props} />;
};

export default YesNoField;
