import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  footerBtnTxt: {
    color: colors.white,
  },
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
  nextButtonV0Flow: {
    backgroundColor: colors.brand,
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
  footerBtnTxt: {
    color: HealthStudyBranding.colors.primary,
  },
  marginTop: {
    marginTop: HealthStudyBranding.sizes.g24,
  },
  newButton: {
    height: HealthStudyBranding.sizes.g48,
    marginBottom: HealthStudyBranding.sizes.g16,
    marginTop: HealthStudyBranding.sizes.g24,
  },
  newText: {
    color: HealthStudyBranding.colors.primary,
  },
  nextButtonV0Flow: {},
  tabTitle: {
    color: HealthStudyBranding.colors.secondary,
    paddingBottom: HealthStudyBranding.sizes.g48,
    paddingTop: HealthStudyBranding.sizes.g48,
  },
  transparentButton: {
    backgroundColor: HealthStudyBranding.colors.transparent,
    borderColor: HealthStudyBranding.colors.brand,
    borderRadius: sizes.xl,
    borderWidth: 1,
  },
  transparentButtonText: {
    color: HealthStudyBranding.colors.brand,
  },
  txtStyle: {
    fontSize: HealthStudyBranding.sizes.g16,
  },
  white: {
    color: HealthStudyBranding.colors.white,
  },
  wrapper: {
    padding: HealthStudyBranding.sizes.g24,
  },
});
