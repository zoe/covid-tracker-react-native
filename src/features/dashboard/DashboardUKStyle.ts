import { sizes } from '@covid/themes';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export type TDashboardUKStyle = {
  calloutContainer: object;
  dietStudyImage: object;
  marginVertical: object;
  overlay: object;
};

export const covidStyles: TDashboardUKStyle = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: sizes.m,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: sizes.xs,
    resizeMode: 'contain',
    width: '100%',
  },
  marginVertical: {
    marginVertical: sizes.xs,
  },
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1, // Needed to ensure it sits on top of overlay in TabNavigator
  },
});

export const healthStudyStyles: TDashboardUKStyle = StyleSheet.create({
  calloutContainer: {
    backgroundColor: HealthStudyBranding.colors.surface.subdued,
    marginHorizontal: HealthStudyBranding.sizes.g16,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: HealthStudyBranding.sizes.g8,
    resizeMode: 'contain',
    width: '100%',
  },
  marginVertical: {
    marginVertical: HealthStudyBranding.sizes.g8,
  },
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1, // Needed to ensure it sits on top of overlay in TabNavigator
  },
});
