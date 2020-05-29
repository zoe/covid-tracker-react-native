import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeView: {
    flexGrow: 1,
    backgroundColor: colors.brand,
  },
  scrollView: {
    backgroundColor: colors.brand,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    marginTop: 32,
    flex: 1,
    backgroundColor: colors.brand,
  },
  nextButtonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: colors.purple,
    fontSize: 16,
  },
  countryFlag: {
    position: 'absolute',
    top: 56,
    end: 32,
  },
  covidContainer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  mapImage: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 48,
    paddingVertical: 24,
    paddingHorizontal: 40,
    textAlign: 'center',
    fontWeight: '300',
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  contributors: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
});
