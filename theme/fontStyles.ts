import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const fontStyles = StyleSheet.create({
  h0Reg: {
    fontSize: 42,
    lineHeight: 48,
    color: colors.primary,
  },
  h1Light: {
    // HeaderLightText - Login & Register Screens
    fontSize: 32,
    lineHeight: 48,
    color: colors.primary,
  },
  h2Reg: {
    // HeaderText - DrawerScreen
    fontSize: 24,
    lineHeight: 32,
    color: colors.primary,
  },
  h3Reg: {
    fontSize: 20,
    lineHeight: 26,
    color: colors.primary,
  },
  bodyLight: {
    // Selector Button
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },
  bodyReg: {
    // Regular Text
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },
  bodySecondary: {
    // Secondary Text
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondary,
  },
  bodyMutedReg: {
    // Muted Text
    fontSize: 16,
    lineHeight: 24,
    color: colors.tertiary,
  },

  bodySmallLight: {
    // Caption Text & Version Text
    fontSize: 14,
    lineHeight: 20,
    color: colors.tertiary,
  },
});
