import { colors } from '@theme';
import { Spinner } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const BrandedSpinner = () => (
  <View style={styles.middleOfScreen}>
    <Spinner color={colors.brand} />
  </View>
);

const styles = StyleSheet.create({
  middleOfScreen: {
    alignContent: 'center',
    flex: 1,
  },
});

export default BrandedSpinner;
