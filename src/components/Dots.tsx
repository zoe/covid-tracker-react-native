import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type TProps = {
  amount: number;
  activeDot: number;
};

export function Dots(props: TProps) {
  return (
    <View pointerEvents="none" style={styles.view}>
      {Array(props.amount)
        .fill(null)
        .map((_, index) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={`dot-${index}`}
            style={[
              index > 0 && styles.marginLeft,
              index + 1 === props.activeDot ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
    </View>
  );
}

const DOT_SIZE = 8;

const dotStyle: ViewStyle = {
  borderRadius: DOT_SIZE / 2,
  height: DOT_SIZE,
  width: DOT_SIZE,
};

const styles = StyleSheet.create({
  dotActive: {
    ...dotStyle,
    backgroundColor: colors.brand,
  },
  dotInactive: {
    ...dotStyle,
    backgroundColor: colors.backgroundFour,
  },
  marginLeft: {
    marginLeft: DOT_SIZE / 2,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
