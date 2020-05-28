import { Spinner } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';

const BrandedSpinner = () => (
  <View style={styles.middleOfScreen}>
    <Spinner color={colors.brand} />
  </View>
);

const styles = StyleSheet.create({
  middleOfScreen: {
    flex: 1,
    alignContent: 'center',
  },
});

export default BrandedSpinner;
