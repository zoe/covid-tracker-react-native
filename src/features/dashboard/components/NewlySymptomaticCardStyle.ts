import { BASELINE_COLOR, CURRENT_COLOR } from '@covid/components/charts/NewlySymptomaticChart';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet, ViewStyle } from 'react-native';

export const COVID_SHARE_BTN_COLOR: string = colors.purple;
export const HEALTH_STUDY_SHARE_BTN_COLOR: string = HealthStudyBranding.colors.primary;

export const thickLineStyle: ViewStyle = {
  borderRadius: 4,
  height: 6,
  marginRight: sizes.xs,
  // Can't use the sizes util as this doesn't contain the value 6
  marginTop: 6,
  width: 16,
};

export const explanationWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: sizes.l,
};

export const covidStyles = StyleSheet.create({
  changeRegionBtn: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  explanationWrapperBottom: {
    ...explanationWrapper,
    marginTop: sizes.s,
  },
  explanationWrapperTop: {
    ...explanationWrapper,
    marginTop: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  minimiseMargin: {
    marginTop: sizes.xs,
  },
  minimisePadding: {
    paddingTop: sizes.xxs,
  },
  textWithHighlight: {
    color: colors.purple,
  },
  thickLineBaseline: {
    ...thickLineStyle,
    backgroundColor: BASELINE_COLOR,
  },
  thickLineCurrent: {
    ...thickLineStyle,
    backgroundColor: CURRENT_COLOR,
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
  changeRegionBtn: {},
  explanationWrapperBottom: {
    ...explanationWrapper,
    marginTop: sizes.s,
  },
  explanationWrapperTop: {
    ...explanationWrapper,
    marginTop: HealthStudyBranding.sizes.g24,
  },
  marginBottom: {
    marginBottom: HealthStudyBranding.sizes.g16,
  },
  marginTop: {
    marginTop: HealthStudyBranding.sizes.g24,
  },
  minimiseMargin: {
    marginTop: sizes.xs,
  },
  minimisePadding: {
    paddingTop: sizes.xxs,
  },
  textWithHighlight: {
    color: HealthStudyBranding.colors.accent,
  },
  thickLineBaseline: {
    ...thickLineStyle,
    backgroundColor: BASELINE_COLOR,
  },
  thickLineCurrent: {
    ...thickLineStyle,
    backgroundColor: CURRENT_COLOR,
  },
  view: {
    backgroundColor: HealthStudyBranding.colors.white,
    borderRadius: HealthStudyBranding.sizes.g16,
    marginVertical: sizes.xs,
    paddingHorizontal: HealthStudyBranding.sizes.g16,
    paddingTop: HealthStudyBranding.sizes.g40,
  },
});
