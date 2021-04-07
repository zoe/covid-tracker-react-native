import React from 'react';
import { StyleSheet, View } from 'react-native';
import { divide, Value } from 'react-native-reanimated';

import Dot from './Dot';

interface IProps {
  dotColor?: string;
  pages: number;
  x: Value<number>;
  width: number;
}

function Pagination({ dotColor = '#000', pages, x, width }: IProps) {
  return (
    <View style={styles.container}>
      {new Array(pages).fill(0).map((_, index) => (
        <Dot key={index} currentIndex={divide(x, width)} index={index} backgroundColor={dotColor} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Pagination;
