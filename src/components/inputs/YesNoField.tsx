import { ButtonsGroup, ISingleButton } from '@covid/components/inputs/ButtonsGroup';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

interface IProps {
  error?: any;
  hideLabel?: boolean;
  label?: string;
  onValueChange: any;
  selectedValue: string;
  testID?: string;
  required?: boolean;
}

export enum EYesNoFieldOptions {
  EMPTY = '',
  NO = 'no',
  YES = 'yes',
}

const items: ISingleButton[] = [
  {
    label: i18n.t('picker-no'),
    value: EYesNoFieldOptions.NO,
  },
  {
    label: i18n.t('picker-yes'),
    value: EYesNoFieldOptions.YES,
  },
];

export function YesNoField(props: IProps) {
  return <ButtonsGroup items={items} {...props} />;
}
