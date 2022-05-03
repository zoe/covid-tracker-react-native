import { sizes } from '@covid/themes';
import { colors } from '@theme';
import HealthStudyBranding from '@tracer/branding';
import { StyleSheet } from 'react-native';

export const covidStyles = StyleSheet.create({
  contributors: {
    marginBottom: sizes.xl,
    paddingHorizontal: sizes.xl,
  },
  covidContainer: {
    backgroundColor: colors.brand,
    flex: 1,
    marginTop: sizes.xl,
    paddingBottom: sizes.m,
    paddingHorizontal: sizes.m,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  login: {
    color: colors.white,
    fontSize: 20,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 32,
    top: 60,
  },
  mapImage: {
    alignSelf: 'center',
    height: 300,
    resizeMode: 'contain',
    width: '100%',
  },
  nextButton: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    fontSize: 16,
  },
  nextButtonContainer: {
    padding: sizes.l,
    paddingBottom: sizes.xl,
  },
  pipe: {
    backgroundColor: colors.white,
    height: 32,
    marginHorizontal: sizes.m,
    width: 1,
  },
  screen: {
    backgroundColor: colors.brand,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
    paddingHorizontal: sizes.l,
    paddingVertical: sizes.l,
    textAlign: 'center',
  },
});

export const healthStudyStyles = StyleSheet.create({
  contributors: {
    marginBottom: HealthStudyBranding.sizes.g32,
    paddingHorizontal: HealthStudyBranding.sizes.g32,
  },
  covidContainer: {
    backgroundColor: colors.brand,
    flex: 1,
    marginTop: HealthStudyBranding.sizes.g32,
    paddingBottom: HealthStudyBranding.sizes.g16,
    paddingHorizontal: HealthStudyBranding.sizes.g16,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  login: {
    color: HealthStudyBranding.colors.white,
    fontSize: 20,
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 32,
    top: 60,
  },
  mapImage: {
    alignSelf: 'center',
    height: 300,
    resizeMode: 'contain',
    width: '100%',
  },
  nextButton: {
    backgroundColor: HealthStudyBranding.colors.purple,
    borderColor: HealthStudyBranding.colors.purple,
    fontSize: 16,
  },
  nextButtonContainer: {
    padding: HealthStudyBranding.sizes.g24,
    paddingBottom: HealthStudyBranding.sizes.g32,
  },
  pipe: {
    backgroundColor: HealthStudyBranding.colors.white,
    height: 32,
    marginHorizontal: HealthStudyBranding.sizes.g16,
    width: 1,
  },
  screen: {
    backgroundColor: colors.brand,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: HealthStudyBranding.colors.white,
    fontFamily: 'SofiaPro-Light',
    fontSize: 32,
    lineHeight: 48,
    paddingHorizontal: HealthStudyBranding.sizes.g24,
    paddingVertical: HealthStudyBranding.sizes.g24,
    textAlign: 'center',
  },
});
