import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    marginTop: 20,
  },
});
