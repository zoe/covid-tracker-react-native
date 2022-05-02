import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  decreasedMargin: {
    marginBottom: sizes.m,
  },
  error: {
    marginLeft: 0,
    marginTop: sizes.xs,
  },
  label: {
    marginBottom: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  notSelected: {
    color: colors.secondary,
  },
  row: {
    flexDirection: 'row',
  },
  selected: {
    color: colors.darkBlue,
  },
});

export const healthStudyStyles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  decreasedMargin: {
    marginBottom: HealthStudyBranding.sizes.g24,
  },
  error: {
    marginLeft: 0,
    marginTop: HealthStudyBranding.sizes.g8,
  },
  label: {
    marginBottom: HealthStudyBranding.sizes.g24,
  },
  marginBottom: {
    marginBottom: HealthStudyBranding.sizes.g24,
  },
  notSelected: {
    color: HealthStudyBranding.colors.secondary,
  },
  row: {
    flexDirection: 'row',
  },
  selected: {
    color: HealthStudyBranding.colors.primary,
  },
});
