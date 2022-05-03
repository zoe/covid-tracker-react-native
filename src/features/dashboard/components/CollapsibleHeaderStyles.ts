import { sizes } from '@covid/themes/theme/sizes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { Dimensions, StyleSheet } from 'react-native';

export type TCollapsibleHeaderScrollViewStyle = {
  container: object;
  drawerToggleOverlay: object;
  drawerToggleWrapperActive: object;
  drawerToggleWrapperInactive: object;
  expandedHeaderContainer: object;
  flex: object;
  header: object;
  overlay: object;
  quarterCircle: object;
  scrollContainer: object;
  subContainer: object;
};

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const covidStyles: TCollapsibleHeaderScrollViewStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.predict,
    flex: 1,
  },
  drawerToggleOverlay: {
    backgroundColor: '#244B9D',
    borderRadius: sizes.drawerToggle + sizes.m,
    marginLeft: sizes.m,
    padding: sizes.m,
  },
  drawerToggleWrapperActive: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  drawerToggleWrapperInactive: {
    justifyContent: 'center',
    paddingRight: sizes.m,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.predict,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: -0,
    width: SCREEN_WIDTH,
    zIndex: 99,
  },
  overlay: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  quarterCircle: {
    aspectRatio: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    zIndex: 100,
  },
  scrollContainer: {
    backgroundColor: colors.backgroundTertiary,
  },
  subContainer: {
    flex: 1,
    paddingTop: sizes.m,
  },
});

export const healthStudyStyles: TCollapsibleHeaderScrollViewStyle = StyleSheet.create({
  container: {
    backgroundColor: HealthStudyBranding.colors.white,
    flex: 1,
  },
  drawerToggleOverlay: {
    backgroundColor: '#244B9D',
    borderRadius: sizes.drawerToggle + sizes.m,
    marginLeft: sizes.m,
    padding: sizes.m,
  },
  drawerToggleWrapperActive: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  drawerToggleWrapperInactive: {
    justifyContent: 'center',
    paddingRight: sizes.m,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: HealthStudyBranding.colors.white,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: -0,
    width: SCREEN_WIDTH,
    zIndex: 99,
  },
  overlay: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  quarterCircle: {
    aspectRatio: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    zIndex: 100,
  },
  scrollContainer: {
    backgroundColor: HealthStudyBranding.colors.surface.subdued,
  },
  subContainer: {
    flex: 1,
    paddingTop: sizes.m,
  },
});
