import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  covidContainer: {
    paddingBottom: sizes.l,
  },
  divider: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginVertical: sizes.xxs,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  login: {
    color: colors.primary,
    marginRight: sizes.m,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
  partnerContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.s,
    marginVertical: sizes.m,
    paddingHorizontal: sizes.xl,
    paddingVertical: sizes.m,
  },
  partnerHeader: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  partnerList: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  partnerLogosGB: {
    alignSelf: 'center',
    marginVertical: sizes.xl,
  },
  partnersLogo: {
    alignSelf: 'center',
    height: 160,
    marginVertical: sizes.m,
    resizeMode: 'contain',
    width: '100%',
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  subheader: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: sizes.xs,
    textAlign: 'center',
  },
  subheader2: {
    color: colors.secondary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    marginTop: sizes.xs,
    paddingVertical: sizes.xs,
    textAlign: 'center',
  },
});

export const healthStudyStyles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  covidContainer: {
    paddingBottom: HealthStudyBranding.sizes.g24,
  },
  divider: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginVertical: HealthStudyBranding.sizes.g4,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  login: {
    color: colors.primary,
    marginRight: HealthStudyBranding.sizes.g16,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
  partnerContainer: {
    backgroundColor: HealthStudyBranding.colors.white,
    borderRadius: HealthStudyBranding.sizes.g12,
    marginVertical: HealthStudyBranding.sizes.g16,
    paddingHorizontal: HealthStudyBranding.sizes.g32,
    paddingVertical: HealthStudyBranding.sizes.g16,
  },
  partnerHeader: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  partnerList: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  partnerLogosGB: {
    alignSelf: 'center',
    marginVertical: HealthStudyBranding.sizes.g32,
  },
  partnersLogo: {
    alignSelf: 'center',
    height: 160,
    marginVertical: HealthStudyBranding.sizes.g16,
    resizeMode: 'contain',
    width: '100%',
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  subheader: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: HealthStudyBranding.sizes.g8,
    textAlign: 'center',
  },
  subheader2: {
    color: HealthStudyBranding.colors.secondary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    marginTop: HealthStudyBranding.sizes.g8,
    paddingVertical: HealthStudyBranding.sizes.g8,
    textAlign: 'center',
  },
});
