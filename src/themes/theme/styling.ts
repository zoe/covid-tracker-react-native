import { StyleSheet } from 'react-native';

import { colors } from './colors';
import sizes from './sizes';

export default StyleSheet.create({
  backgroundWhite: {
    backgroundColor: 'white',
  },
  colorGray: {
    color: colors.gray.main.bgColor,
  },
  colorWhite: {
    color: 'white',
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  marginBottom: {
    marginBottom: sizes.spacing,
  },
  marginBottomAuto: {
    marginBottom: 'auto',
  },
  marginBottomBig: {
    marginBottom: sizes.spacingBig,
  },
  marginBottomHuge: {
    marginBottom: sizes.spacingHuge,
  },
  marginBottomSmall: {
    marginBottom: sizes.spacingSmall,
  },
  marginRightSmall: {
    marginRight: sizes.spacingSmall,
  },
  marginVerticalSmall: {
    marginVertical: sizes.spacingSmall,
  },
  marginVerticalHuge: {
    marginVertical: sizes.spacingHuge,
  },
  measureWidth: {
    height: 0,
    width: '100%',
  },
  padding: {
    padding: sizes.spacing,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadow: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textarea: {
    backgroundColor: '#EEEEEF',
    borderRadius: 16,
  },
});
