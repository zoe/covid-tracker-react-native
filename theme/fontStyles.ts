import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const fontStyles = StyleSheet.create({
  bodyLight: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMutedReg: {
    color: colors.tertiary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyReg: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySecondary: {
    color: colors.secondary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmallLight: {
    color: colors.tertiary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 14,
    lineHeight: 20,
  },
  bodyXXSmall: {
    color: colors.quinary,
    fontSize: 10,
    lineHeight: 10,
  },
  h0Reg: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 42,
    lineHeight: 48,
  },
  h1Light: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
  },
  h2Reg: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 24,
    lineHeight: 32,
  },
  h3Reg: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 20,
    lineHeight: 26,
  },
  label: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  labelSecondary: {
    color: colors.secondary,
    fontFamily: 'SofiaPro-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
});
