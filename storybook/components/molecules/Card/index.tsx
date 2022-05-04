import { grid } from '@tracer/branding/grid';
import Container from '@tracer/components/atoms/Container';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import CardBody, { ICardBodyProps } from './body';
import CardFooter, { ICardFooterProps } from './footer';
import CardHeader, { ICardHeaderProps } from './header';

export interface ICardProps {
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  customBody?: ReactNode;
  headerProps?: ICardHeaderProps;
  footerProps?: ICardFooterProps;
  bodyProps?: ICardBodyProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Card
 *
 * @param style custom styling, overrides all other styles
 */
export default function Card({
  customHeader,
  customFooter,
  customBody,
  bodyProps,
  footerProps,
  headerProps,
  style,
}: ICardProps) {
  return (
    <Container rounded style={[baseStyle.view, style]}>
      {!customHeader && headerProps ? <CardHeader {...headerProps} /> : null}
      {customHeader && !headerProps ? customHeader : null}
      {!customBody && bodyProps ? <CardBody {...bodyProps} /> : null}
      {customBody && !bodyProps ? customBody : null}
      {!customFooter && footerProps ? <CardFooter {...footerProps} /> : null}
      {customFooter && !footerProps ? customFooter : null}
    </Container>
  );
}

const baseStyle = StyleSheet.create({
  view: {
    backgroundColor: colors.white,
    borderRadius: grid.g16,
    paddingHorizontal: 0,
    paddingVertical: grid.g8,
  },
});
