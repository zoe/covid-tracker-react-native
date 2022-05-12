import Card, { ICardProps } from '@tracer/components/molecules/Card';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IStackedCardProps {
  cardProps: ICardProps;
  style?: StyleProp<ViewStyle>;
}

/**
 * StackedCard
 *
 * Contents of card are stacked on top of each other
 *
 * @param cardProps props for the contents of the modal
 */
export default function StackedCard({ cardProps, style }: IStackedCardProps) {
  return <Card {...cardProps} style={style} />;
}
