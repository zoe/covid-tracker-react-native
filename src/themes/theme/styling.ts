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
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  marginBottom: {
    marginBottom: sizes.spacing,
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
  shadow: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
