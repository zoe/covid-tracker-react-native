import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const COVID_SHARE_BTN_COLOR: string = colors.purple;
export const HEALTH_STUDY_SHARE_BTN_COLOR: string = HealthStudyBranding.colors.primary;

export const covidStyles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
  },
  deltaTag: {
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginRight: {
    marginRight: sizes.s,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  minimiseMargin: {
    marginTop: sizes.xxs,
  },
  minimisePadding: {
    paddingBottom: sizes.xxs,
    paddingTop: sizes.xxs,
  },
  touchableChart: {
    marginTop: sizes.m,
    width: '100%',
  },
  touchableText: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: sizes.m,
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginVertical: sizes.xs,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.l,
  },
});

export const healthStudyStyles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
  },
  deltaTag: {
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: HealthStudyBranding.sizes.g16,
  },
  marginRight: {
    marginRight: HealthStudyBranding.sizes.g12,
  },
  marginTop: {
    marginTop: HealthStudyBranding.sizes.g16,
  },
  minimiseMargin: {
    marginTop: HealthStudyBranding.sizes.g4,
  },
  minimisePadding: {
    paddingBottom: HealthStudyBranding.sizes.g4,
    paddingTop: HealthStudyBranding.sizes.g4,
  },
  touchableChart: {
    marginTop: HealthStudyBranding.sizes.g16,
    width: '100%',
  },
  touchableText: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: HealthStudyBranding.sizes.g16,
  },
  view: {
    backgroundColor: HealthStudyBranding.colors.white,
    borderRadius: HealthStudyBranding.sizes.g16,
    marginVertical: HealthStudyBranding.sizes.g8,
    paddingHorizontal: HealthStudyBranding.sizes.g16,
    paddingTop: HealthStudyBranding.sizes.g40,
  },
});
