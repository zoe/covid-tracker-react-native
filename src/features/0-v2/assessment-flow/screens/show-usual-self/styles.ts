import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { StyleSheet } from 'react-native';

export const baseStyle = StyleSheet.create({
  body: {
    backgroundColor: colors.surface.interactive,
  },
  buttonTextStyle: {
    textTransform: 'none',
  },
  cardFooter: {
    backgroundColor: colors.surface.interactive,
    justifyContent: 'flex-start',
    paddingBottom: grid.g8,
    paddingHorizontal: grid.g16,
  },
  header: {
    marginVertical: grid.g4,
    paddingHorizontal: grid.g16,
  },
  infoColumn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g2,
  },
  subTitle: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'left',
  },
});
