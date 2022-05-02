import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.l,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    borderColor: colors.backgroundTertiary,
    color: colors.black,
    marginBottom: sizes.m,
    marginTop: sizes.l,
  },
  newText: {
    color: colors.primary,
  },
  tabTitle: {
    color: colors.secondary,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: colors.brand,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
  transparentButtonText: {
    color: colors.brand,
  },
  txtStyle: {
    color: colors.textDark,
  },
  white: {
    color: colors.white,
  },
  wrapper: {
    padding: sizes.l,
  },
});

export const healthStudyStyles = StyleSheet.create({
  marginTop: {
    marginTop: HealthStudyBranding.sizes.g24,
  },
  newButton: {
    marginBottom: HealthStudyBranding.sizes.g16,
    marginTop: HealthStudyBranding.sizes.g24,
  },
  newText: {
    color: HealthStudyBranding.colors.primary,
  },
  tabTitle: {
    color: HealthStudyBranding.colors.secondary,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: HealthStudyBranding.colors.brand,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
  transparentButtonText: {
    color: HealthStudyBranding.colors.brand,
  },
  txtStyle: {},
  white: {
    color: HealthStudyBranding.colors.white,
  },
  wrapper: {
    padding: HealthStudyBranding.sizes.g24,
  },
});
