import { StyleSheet } from 'react-native';

import { colors } from '@theme';

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  formItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
