import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { StyleSheet } from 'react-native';

export const baseStyle = StyleSheet.create({
  additionalSymptomHeader: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  additionalSymptomHeaderRow: {
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g24,
  },
  body: {
    backgroundColor: colors.surface.interactive,
    paddingHorizontal: grid.g16,
  },
  cardButtonGroup: {
    paddingTop: grid.g24,
  },
  dividerRow: {
    flexGrow: 1,
    paddingBottom: grid.g24,
    paddingHorizontal: grid.g24,
    paddingTop: grid.g24,
  },
  footer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: grid.g32,
    borderTopRightRadius: grid.g32,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  footerRow: {
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingBottom: grid.g24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  subTitleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 40,
    marginBottom: grid.g24,
    paddingHorizontal: grid.g24,
    textAlign: 'center',
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
