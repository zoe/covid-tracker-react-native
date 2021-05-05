import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from './';

export default StyleSheet.create({
  backgroundWhite: {
    backgroundColor: COLORS.white,
  },
  colorGray: {
    color: COLORS.gray,
  },
  colorWhite: {
    color: COLORS.white,
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
  marginBottomSmall: {
    marginBottom: SIZES.spacingSmall,
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
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
