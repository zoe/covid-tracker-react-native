import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';

export interface ICardBodyProps {
  custom?: ReactNode;
  body?: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * CardBody
 *
 * @param body body text to be displayed
 * @param custom custom body to override default
 * @param style custom styling, overrides all other styles
 */
export default function CardBody({ body, custom, textStyle, viewStyle }: ICardBodyProps) {
  return (
    <Row style={[baseStyle.row, viewStyle]}>
      {body ? <Text style={[baseStyle.bodyTxtColor, textStyle]}>{body}</Text> : null}
      {
        // eslint-disable-next-line no-restricted-syntax
        custom || null
      }
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  bodyTxtColor: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  row: {
    backgroundColor: colors.white,
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g8,
  },
});
