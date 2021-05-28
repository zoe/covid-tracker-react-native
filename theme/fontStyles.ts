import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const fontStyles = StyleSheet.create({
  bodyLight: {
    color: colors.primary,
    // Selector Button
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMutedReg: {
    color: colors.tertiary,
    // Muted Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyReg: {
    color: colors.primary,
    // Regular Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySecondary: {
    color: colors.secondary,
    // Secondary Text
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmallLight: {
    color: colors.tertiary,
    // Caption Text & Version Text
    fontFamily: 'SofiaPro-Light',
    fontSize: 14,
    lineHeight: 20,
  },
  h0Reg: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 42,
    lineHeight: 48,
  },
  h1Light: {
    color: colors.primary,
    // HeaderLightText - Login & Register Screens
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
  },
  h2Reg: {
    color: colors.primary,
    // HeaderText - DrawerScreen
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
});
