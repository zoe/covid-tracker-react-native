import { ButtonsGroup, ISingleButton } from '@covid/components/inputsRedesigned/ButtonsGroup';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  onValueChange: any;
  selectedValue: string;
  showPnts?: boolean;
  testID?: string;
  reBrand?: boolean;
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
  const styles = props.reBrand ? healthStudyStyles : covidStyles;
  return (
    <ButtonsGroup
      hideLabel
      items={items}
      style={styles.buttonStyle}
      unselectedBgColor={styles.bgSecondary.color}
      unselectedTextColor={styles.txtColor.color}
      {...props}
    />
  );
}

const covidStyles = StyleSheet.create({
  bgSecondary: {
    color: colors.backgroundSecondary,
  },
  buttonStyle: {
    borderColor: colors.darkBlue,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
  txtColor: {
    color: colors.darkBlue,
  },
});

const healthStudyStyles = StyleSheet.create({
  bgSecondary: {
    color: HealthStudyBranding.colors.white,
  },
  buttonStyle: {
    borderColor: HealthStudyBranding.colors.primary,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
  txtColor: {
    color: HealthStudyBranding.colors.primary,
  },
});
