import { ButtonsGroup, ISingleButton } from '@covid/components/inputsRedesigned/ButtonsGroup';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onValueChange: any;
  selectedValue: string;
  showPnts?: boolean;
  testID?: string;
}

export enum ENegativePositiveFieldOptions {
  EMPTY = '',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
}

const items: ISingleButton[] = [
  {
    label: i18n.t('picker-negative'),
    value: ENegativePositiveFieldOptions.NEGATIVE,
  },
  {
    label: i18n.t('picker-positive'),
    value: ENegativePositiveFieldOptions.POSITIVE,
  },
];

export function NegativePositiveField(props: IProps) {
  return (
    <ButtonsGroup
      hideLabel
      items={items}
      style={styles.buttonStyle}
      unselectedBgColor={colors.backgroundSecondary}
      unselectedTextColor={colors.darkBlue}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: colors.darkBlue,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
});
