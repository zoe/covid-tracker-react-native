import CovidStyle from '@covid/themes/theme';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

const MAP_HEIGHT = 246;
export const COVID_SHARE_BTN_COLOR: string = colors.purple;
export const HEALTH_STUDY_SHARE_BTN_COLOR: string = HealthStudyBranding.colors.primary;

export const covidStyles = StyleSheet.create({
  detailsButton: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: CovidStyle.sizes.l,
    paddingHorizontal: CovidStyle.sizes.xxl,
  },
  detailsButtonLabel: {
    color: colors.purple,
    fontSize: 14,
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
    height: 1,
    width: '92%',
  },
  emptyStateArrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  mapContainer: {
    width: '100%',
  },
  mapImage: {
    height: MAP_HEIGHT,
    resizeMode: 'cover',
  },
  postcodeButton: {
    marginBottom: CovidStyle.sizes.l,
  },
  primaryLabel: {
    color: colors.textDark,
    textAlign: 'center',
  },
  root: {
    backgroundColor: colors.white,
    borderRadius: CovidStyle.sizes.m,
    marginVertical: CovidStyle.sizes.xs,
    overflow: 'hidden',
  },
  shareIcon: {
    marginRight: CovidStyle.sizes.xs,
    marginTop: CovidStyle.sizes.xxs,
  },
  shareLabel: {
    color: colors.purple,
    fontSize: 14,
    textAlign: 'center',
  },
  shareTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: CovidStyle.sizes.m,
    paddingTop: CovidStyle.sizes.xxs,
  },
  snapshotContainer: {
    backgroundColor: colors.white,
    width: '100%',
  },
  stats: {
    marginRight: CovidStyle.sizes.xs,
  },
  statsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CovidStyle.sizes.m,
    width: '100%',
  },
  statsLabel: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: CovidStyle.sizes.xxs,
  },
  statsRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  webview: {
    height: MAP_HEIGHT,
  },
});

export const healthStudyStyles = StyleSheet.create({
  detailsButton: {
    backgroundColor: 'transparent',
    borderColor: HealthStudyBranding.colors.accent,
    borderWidth: 1,
    marginBottom: HealthStudyBranding.sizes.g24,
    paddingHorizontal: HealthStudyBranding.sizes.g48,
  },
  detailsButtonLabel: {
    color: HealthStudyBranding.colors.purple,
    fontSize: 14,
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
    height: 1,
    width: '92%',
  },
  emptyStateArrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  mapContainer: {
    width: '100%',
  },
  mapImage: {
    height: MAP_HEIGHT,
    resizeMode: 'cover',
  },
  postcodeButton: {
    marginBottom: HealthStudyBranding.sizes.g24,
  },
  primaryLabel: {
    color: HealthStudyBranding.colors.textDark,
    textAlign: 'center',
  },
  root: {
    backgroundColor: HealthStudyBranding.colors.white,
    borderRadius: HealthStudyBranding.sizes.g16,
    marginVertical: HealthStudyBranding.sizes.g8,
    overflow: 'hidden',
    paddingTop: HealthStudyBranding.sizes.g12,
  },
  shareIcon: {
    marginRight: HealthStudyBranding.sizes.g8,
    marginTop: HealthStudyBranding.sizes.g4,
  },
  shareLabel: {
    color: HealthStudyBranding.colors.accent,
    fontSize: 14,
    textAlign: 'center',
  },
  shareTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: HealthStudyBranding.sizes.g16,
    paddingTop: HealthStudyBranding.sizes.g4,
  },
  snapshotContainer: {
    backgroundColor: HealthStudyBranding.colors.white,
    width: '100%',
  },
  stats: {
    marginRight: HealthStudyBranding.sizes.g8,
  },
  statsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: HealthStudyBranding.sizes.g16,
    width: '100%',
  },
  statsLabel: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: HealthStudyBranding.sizes.g4,
  },
  statsRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  webview: {
    height: MAP_HEIGHT,
  },
});
