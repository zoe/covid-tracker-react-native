import { RegularText } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import { colors, fontStyles } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  children: React.ReactNode;
  onPress: () => void;
  redesign?: boolean; // TODO: remove in future once redesign is complete
  reBrand?: boolean;
  selected: boolean;
  style?: any;
  testID?: string;
  unselectedBgColor?: string;
  unselectedTextColor?: string;
}

export function SelectableButton({
  style,
  children,
  onPress,
  redesign,
  selected,
  testID,
  unselectedBgColor,
  unselectedTextColor,
  reBrand = false,
}: IProps) {
  const styles = reBrand ? healthStudyStyles : covidStyles;
  const backgroundColor = selected
    ? redesign
      ? styles.darkBlue.color
      : styles.brand.color
    : unselectedBgColor || colors.backgroundTertiary;
  const textColor = selected ? colors.white : unselectedTextColor || styles.primary.color;
  const btnStyle = [{ backgroundColor, borderColor: backgroundColor }, styles.button, style];

  return (
    <Button onPress={onPress} style={btnStyle} testID={testID}>
      <RegularText style={[fontStyles.bodyLight, styles.label, { color: textColor }]}>{children}</RegularText>
    </Button>
  );
}

const covidStyles = StyleSheet.create({
  brand: {
    color: colors.brand,
  },
  button: {
    borderRadius: sizes.xs,
    elevation: 0,
    height: 48,
    justifyContent: 'center',
  },
  darkBlue: {
    color: colors.darkBlue,
  },
  label: {
    lineHeight: 20,
    paddingHorizontal: sizes.m,
    textAlign: 'center',
  },
  primary: {
    color: colors.primary,
  },
});

const healthStudyStyles = StyleSheet.create({
  brand: {
    color: HealthStudyBranding.colors.brand,
  },
  button: {
    borderRadius: HealthStudyBranding.sizes.g8,
    elevation: 0,
    height: 48,
    justifyContent: 'center',
  },
  darkBlue: {
    color: colors.darkBlue,
  },
  label: {
    lineHeight: 20,
    paddingHorizontal: HealthStudyBranding.sizes.g16,
    textAlign: 'center',
  },
  primary: {
    color: HealthStudyBranding.colors.primary,
  },
});
