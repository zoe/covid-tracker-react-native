import { colors } from '@theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  headerRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  covidContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  partnerHeader: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginVertical: 5,
  },
  partnerList: {
    marginTop: 0,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  login: {
    color: colors.primary,
    marginHorizontal: 16,
  },
  subheader: {
    paddingVertical: 8,
    color: colors.primary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  subheader2: {
    paddingVertical: 8,
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    marginTop: 8,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 8,
    textAlign: 'center',
    marginTop: 25,
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  partnersLogo: {
    marginVertical: 16,
    height: 160,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  partnerContainer: {
    marginVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
});

export default styles;
