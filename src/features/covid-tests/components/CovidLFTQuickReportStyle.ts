import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    marginTop: sizes.l,
    paddingBottom: sizes.l,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.m,
  },
  error: {
    marginTop: sizes.m,
    textAlign: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sizes.s,
  },
  question: {
    textAlign: 'center',
  },
  rhythm: {
    fontSize: sizes.l,
  },
  secondary: {
    color: colors.secondary,
  },
  tag: {
    alignSelf: 'center',
    marginTop: sizes.xs,
  },
  tagType: {
    color: colors.teal,
  },
});

export const healthStudyStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    marginTop: HealthStudyBranding.sizes.g24,
    paddingBottom: HealthStudyBranding.sizes.g24,
    paddingHorizontal: HealthStudyBranding.sizes.g16,
    paddingTop: HealthStudyBranding.sizes.g16,
  },
  error: {
    marginTop: HealthStudyBranding.sizes.g16,
    textAlign: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HealthStudyBranding.sizes.g12,
  },
  question: {
    textAlign: 'center',
  },
  rhythm: {
    fontSize: HealthStudyBranding.sizes.g24,
  },
  secondary: {
    color: HealthStudyBranding.colors.secondary,
  },
  tag: {
    alignSelf: 'center',
    marginTop: HealthStudyBranding.sizes.g8,
  },
  tagType: {
    color: HealthStudyBranding.colors.primary,
  },
});
