import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const fonts = StyleSheet.create({
  bodyLight: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMutedReg: {
    color: colors.text.tertiary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyReg: {
    color: colors.text.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySecondary: {
    color: colors.text.secondary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmallLight: {
    color: colors.text.tertiary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 14,
    lineHeight: 20,
  },
  fieldLabel: {
    color: colors.text.secondary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  h0Reg: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 42,
    lineHeight: 48,
  },
  h1Light: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
  },
  h2Reg: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 24,
    lineHeight: 32,
  },
  h3Reg: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 20,
    lineHeight: 26,
  },
  label: {
    color: colors.text.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  labelSecondary: {
    color: colors.text.secondary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
});
