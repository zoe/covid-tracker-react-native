import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export type TCompactHeaderStyle = {
  button: object;
  flex: object;
  flex2: object;
  logo: object;
  root: object;
};

export const covidStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    elevation: 0,
    height: 48,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  logo: {
    resizeMode: 'contain',
    width: 56,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    padding: sizes.m,
  },
});

export const healthStudyStyles = StyleSheet.create({
  button: {
    backgroundColor: HealthStudyBranding.colors.brand,
    elevation: 0,
    height: HealthStudyBranding.sizes.g48,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  logo: {
    resizeMode: 'contain',
    width: 56,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    padding: HealthStudyBranding.sizes.g16,
  },
});
