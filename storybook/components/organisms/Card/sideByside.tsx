import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Card, { ICardProps } from '@tracer/components/molecules/Card';
import { ICardFooterProps } from '@tracer/components/molecules/Card/footer';
import { ICardHeaderProps } from '@tracer/components/molecules/Card/header';
import Divider from '@tracer/components/molecules/Divider';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

const COLUMN_WIDTH = '50%';

export interface ISideBySideCardProps {
  header?: ICardHeaderProps;
  leftSide?: ICardProps;
  rightSide?: ICardProps;
  leftColWidthPercent?: string;
  rightColWidthPercent?: string;
  footer?: ICardFooterProps;
  style?: StyleProp<ViewStyle>;
}

/**
 * SideBySideCard
 *
 * Contents of card are stacked side by side in a 2 column format
 *
 * @param cardProps props for the contents of the modal
 */
export default function SideBySideCard({
  footer,
  header,
  leftSide,
  leftColWidthPercent = COLUMN_WIDTH,
  rightSide,
  rightColWidthPercent = COLUMN_WIDTH,
  style,
}: ISideBySideCardProps) {
  return (
    <Card
      customBody={
        <Row style={[baseStyles.cardContentBody]}>
          <Column style={[{ width: leftColWidthPercent }]}>
            <Card {...leftSide} style={baseStyles.sideCardBody} />
          </Column>
          <Divider style={baseStyles.cardDivider} />
          <Column style={[{ width: rightColWidthPercent }]}>
            <Card {...rightSide} style={baseStyles.sideCardBody} />
          </Column>
        </Row>
      }
      footerProps={footer}
      headerProps={header}
      style={[baseStyles.cardView, style]}
    />
  );
}

const baseStyles = StyleSheet.create({
  cardContentBody: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: grid.g8,
    width: '100%',
  },
  cardDivider: {
    marginHorizontal: grid.g8,
    marginVertical: grid.g16,
    paddingVertical: grid.g16,
  },
  cardView: {},
  sideCardBody: {
    backgroundColor: colors.transparent,
    borderRadius: 0,
    paddingHorizontal: grid.g8,
  },
});
