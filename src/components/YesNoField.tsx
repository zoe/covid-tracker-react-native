import i18n from '@covid/locale/i18n';
import React from 'react';

import { ButtonsGroup, ISingleButton } from './inputs/ButtonsGroup';

interface IProps {
  selectedValue: string;
  onValueChange: any;
  label?: string;
  hideLabel?: boolean;
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

export function YesNoField({ label, onValueChange, ...props }: IProps) {
  return <ButtonsGroup items={Items()} label={label} onValueChange={onValueChange} {...props} />;
}

export default YesNoField;
