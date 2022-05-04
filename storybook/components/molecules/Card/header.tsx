import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';

export interface IStandardCardHeaderProps {
  title?: string;
  topLabel?: string;
  bottomLabel?: string;
}

function StandardCardHeader({ title, topLabel, bottomLabel }: IStandardCardHeaderProps) {
  return (
    <Column>
      {topLabel ? (
        <Row>
          <Text style={baseStyle.topLabelTxt}>{topLabel}</Text>
        </Row>
      ) : null}
      {title ? (
        <Row>
          <Text style={baseStyle.titleTxt}>{title}</Text>
        </Row>
      ) : null}
      {bottomLabel ? (
        <Row>
          <Text style={baseStyle.bottomLabelTxt}>{bottomLabel}</Text>
        </Row>
      ) : null}
    </Column>
  );
}

export interface ICardHeaderProps {
  custom?: ReactNode;
  headerProps?: IStandardCardHeaderProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Card
 *
 * @param style custom styling, overrides all other styles
 */
export default function CardHeader({ headerProps, style }: ICardHeaderProps) {
  return (
    <Row style={[baseStyle.row, style]}>
      <StandardCardHeader {...headerProps} />
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  bottomLabelTxt: {
    fontSize: 8,
  },
  row: {
    backgroundColor: colors.white,
    borderTopLeftRadius: grid.g16,
    borderTopRightRadius: grid.g16,
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g8,
  },
  titleTxt: {
    color: colors.text.tertiary,
    fontSize: 14,
  },
  topLabelTxt: {
    fontSize: 8,
  },
  txtColor: {
    color: colors.text.primary,
    fontSize: 14,
  },
});
