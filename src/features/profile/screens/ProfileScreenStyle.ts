import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  avatar: {
    backgroundColor: '#8C94B5',
    color: 'white',
  },
  details: {
    marginLeft: sizes.m,
  },
  detailsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: sizes.xxs,
  },
  detailsText: {
    marginLeft: sizes.s,
  },
  email: {
    marginTop: sizes.xs,
    textDecorationLine: 'underline',
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: sizes.l,
  },
  logout: {
    marginBottom: sizes.xs,
    marginTop: sizes.m,
  },
  marginBottomMedium: {
    marginBottom: sizes.m,
  },
  profileActionCard: {
    color: colors.darkBlue,
  },
  profileActionVaccineCard: {
    color: colors.vegan,
  },
  spitTestIcon: {
    color: '#0165B5',
  },
  syringeIcon: {
    color: '#467980',
  },
  tag: {
    color: colors.accent,
  },
  userDetails: {
    flexDirection: 'row',
  },
});

export const healthStudyStyles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  avatar: {
    backgroundColor: HealthStudyBranding.colors.highlight.bright,
    color: HealthStudyBranding.colors.highlight.white,
  },
  details: {
    marginLeft: HealthStudyBranding.sizes.g16,
  },
  detailsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: HealthStudyBranding.sizes.g4,
  },
  detailsText: {
    marginLeft: HealthStudyBranding.sizes.g12,
  },
  email: {
    marginTop: HealthStudyBranding.sizes.g8,
    textDecorationLine: 'underline',
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: HealthStudyBranding.sizes.g24,
  },
  logout: {
    marginBottom: HealthStudyBranding.sizes.g8,
    marginTop: HealthStudyBranding.sizes.g16,
  },
  marginBottomMedium: {
    marginBottom: HealthStudyBranding.sizes.g16,
  },
  profileActionCard: {
    color: HealthStudyBranding.colors.brand,
  },
  profileActionVaccineCard: {
    color: HealthStudyBranding.colors.tags.vegan,
  },
  spitTestIcon: {
    color: HealthStudyBranding.colors.brand,
  },
  syringeIcon: {
    color: HealthStudyBranding.colors.tags.vegan,
  },
  tag: {
    color: HealthStudyBranding.colors.accent,
  },
  userDetails: {
    flexDirection: 'row',
  },
});
