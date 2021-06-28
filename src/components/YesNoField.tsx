import i18n from '@covid/locale/i18n';
import * as React from 'react';

import { ButtonsGroup, ISingleButton } from './inputs/ButtonsGroup';

interface IProps {
  error?: any;
  hideLabel?: boolean;
  label?: string;
  onValueChange: any;
  selectedValue: string;
  testID?: string;
  required?: boolean;
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
