import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { FlexAlignType, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';

export interface ICardActionItemProps {
  action: ReactNode;
  height: number;
  alignItems?: FlexAlignType;
}

const CardActionItem = ({ action, height = 48, alignItems = 'center' }: ICardActionItemProps) => {
  const cardActionItemStyle = StyleSheet.create({ item: { alignItems, height } });
  return <Column style={cardActionItemStyle.item}>{action}</Column>;
};

export interface ICardActionProps {
  actions: ICardActionItemProps[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Card
 *
 * @param style custom styling, overrides all other styles
 */
export default function CardActions({ style, actions }: ICardActionProps) {
  return (
    <Row style={[baseStyle.row, style]}>
      {actions.map((actionProps) => (
        <CardActionItem {...actionProps} />
      ))}
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
