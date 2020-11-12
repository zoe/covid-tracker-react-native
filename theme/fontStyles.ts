import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const fontStyles = StyleSheet.create({
  h0Reg: {
    fontFamily: 'SofiaPro-Light',
    fontSize: 42,
    lineHeight: 48,
    color: colors.primary,
  },
  h1Light: {
    // HeaderLightText - Login & Register Screens
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
    color: colors.primary,
  },
  h2Reg: {
    // HeaderText - DrawerScreen
    fontFamily: 'SofiaPro-Medium',
    fontSize: 24,
    lineHeight: 32,
    color: colors.primary,
  },
  h3Reg: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: 20,
    lineHeight: 26,
    color: colors.primary,
  },
  bodyLight: {
    // Selector Button
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },
  bodyReg: {
    // Regular Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },
  bodySecondary: {
    // Secondary Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondary,
  },
  bodyMutedReg: {
    // Muted Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.tertiary,
  },

  bodySmallLight: {
    // Caption Text & Version Text
    fontFamily: 'SofiaPro-Light',
    fontSize: 14,
    lineHeight: 20,
    color: colors.tertiary,
  },
});
