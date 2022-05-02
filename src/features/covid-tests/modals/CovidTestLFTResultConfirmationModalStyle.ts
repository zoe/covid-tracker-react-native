import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  negativeButton: {
    backgroundColor: 'transparent',
    borderColor: colors.darkBlue,
    borderWidth: 1,
    marginTop: sizes.m,
  },
  negativeButtonText: {
    color: colors.darkBlue,
  },
  positiveButton: {
    backgroundColor: colors.darkBlue,
  },
  tag: {
    alignSelf: 'center',
    marginBottom: sizes.m,
  },
  tagColor: {
    color: colors.teal,
  },
  title: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});

export const healthStudyStyles = StyleSheet.create({
  negativeButton: {
    backgroundColor: 'transparent',
    borderColor: HealthStudyBranding.colors.primary,
    borderWidth: 1,
    marginTop: sizes.m,
  },
  negativeButtonText: {
    color: HealthStudyBranding.colors.primary,
  },
  positiveButton: {
    backgroundColor: HealthStudyBranding.colors.primary,
  },
  tag: {
    alignSelf: 'center',
    marginBottom: HealthStudyBranding.sizes.g16,
  },
  tagColor: {
    color: HealthStudyBranding.colors.brand,
  },
  title: {
    marginVertical: HealthStudyBranding.sizes.g16,
    textAlign: 'center',
  },
});
