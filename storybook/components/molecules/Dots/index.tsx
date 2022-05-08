import Column from '@tracer/components/atoms/Column';
import Dot from '@tracer/components/atoms/Dot';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { grid } from '../../../branding/grid';

export interface IDotProps {
  style?: StyleProp<ViewStyle>;
  activeIndex: number;
  testID?: string;
  length: number;
}

/**
 * Dot
 *
 * @param style custom styling, overrides all other styles
 */
export default function Dots({ style, activeIndex, length, testID = 'Dot-test-id' }: IDotProps) {
  const dummy = new Array(length).fill(0);
  return (
    <Row style={[baseStyle.view, style]} testID={testID}>
      {/* @ts-ignore */}
      {dummy.map((_: number, index: number) => {
        return (
          <Column key={`flow-screen-dot-column-${index + 1}`} style={baseStyle.dotGroup}>
            <Dot active={index === activeIndex - 1} key={`flow-screen-dot-${index + 1}`} />
          </Column>
        );
      })}
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  dotGroup: {
    paddingHorizontal: grid.g4,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: grid.g32,
  },
});
