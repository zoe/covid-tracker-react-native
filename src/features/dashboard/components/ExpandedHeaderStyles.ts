import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export type TExpandedHeaderStyle = {
  button: object;
  card: object;
  contributorsWrapper: object;
  logoWrapper: object;
  marginBottom: object;
  root: object;
  textContributors: object;
  textCount: object;
  textToday: object;
};

export const covidStyles: TExpandedHeaderStyle = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    elevation: 0,
    height: 48,
    marginTop: sizes.m,
    paddingHorizontal: sizes.xl,
  },
  card: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: sizes.m,
    marginHorizontal: sizes.m,
    paddingVertical: sizes.l,
  },
  contributorsWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  logoWrapper: {
    height: sizes.headerCompactHeight,
    justifyContent: 'center',
    paddingLeft: sizes.m,
    width: '100%',
  },
  marginBottom: {
    marginBottom: sizes.xxs,
  },
  root: {
    alignItems: 'center',
    backgroundColor: colors.predict,
    height: sizes.headerExpandedHeight,
  },
  textContributors: {
    color: colors.white,
    textAlign: 'center',
  },
  textCount: {
    color: colors.backgroundFour,
    marginTop: sizes.m,
    textAlign: 'center',
  },
  textToday: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
});

export const healthStudyStyle: TExpandedHeaderStyle = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: HealthStudyBranding.colors.accent,
    borderColor: HealthStudyBranding.colors.accent,
    elevation: 0,
    height: 48,
    marginTop: HealthStudyBranding.sizes.g16,
    paddingHorizontal: sizes.xl,
  },
  card: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: HealthStudyBranding.colors.surface.interactive,
    borderRadius: HealthStudyBranding.sizes.g16,
    marginHorizontal: HealthStudyBranding.sizes.g16,
    paddingVertical: HealthStudyBranding.sizes.g24,
  },
  contributorsWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  logoWrapper: {
    height: sizes.headerCompactHeight,
    justifyContent: 'center',
    paddingLeft: sizes.m,
    width: '100%',
  },
  marginBottom: {
    marginBottom: HealthStudyBranding.sizes.g4,
  },
  root: {
    alignItems: 'center',
    backgroundColor: HealthStudyBranding.colors.white,
    height: sizes.headerExpandedHeight,
  },
  textContributors: {
    color: HealthStudyBranding.colors.text.primary,
    textAlign: 'center',
  },
  textCount: {
    color: HealthStudyBranding.colors.text.primary,
    marginTop: HealthStudyBranding.sizes.g16,
    textAlign: 'center',
  },
  textToday: {
    color: HealthStudyBranding.colors.text.primary,
    textAlign: 'center',
    width: '100%',
  },
});
