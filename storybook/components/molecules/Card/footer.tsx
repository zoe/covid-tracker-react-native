import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';

export interface IStandardCardFooterProps {
  footerTxt: string;
}

function StandardCardFooter({ footerTxt }: IStandardCardFooterProps) {
  return (
    <Column>
      <Text style={baseStyle.footerTxt}>{footerTxt}</Text>
    </Column>
  );
}

export interface ICardFooterProps {
  custom?: ReactNode;
  footerProps: IStandardCardFooterProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Card
 *
 * @param style custom styling, overrides all other styles
 */
export default function CardFooter({ style, footerProps }: ICardFooterProps) {
  return (
    <Row style={[baseStyle.row, style]}>
      <StandardCardFooter {...footerProps} />
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  footerTxt: {
    color: colors.text.accent,
    fontSize: 14,
  },
  row: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: grid.g16,
    borderBottomRightRadius: grid.g16,
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g8,
  },
});
