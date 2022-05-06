import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginBottomMedium: {
    marginBottom: sizes.m,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  tag: {
    color: colors.accent,
  },
});

export const healthStudyStyles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  marginBottom: {
    marginBottom: HealthStudyBranding.sizes.g24,
  },
  marginBottomMedium: {
    marginBottom: HealthStudyBranding.sizes.g16,
  },
  marginTop: {
    marginTop: HealthStudyBranding.sizes.g16,
  },
  tag: {
    color: HealthStudyBranding.colors.primary,
  },
});
