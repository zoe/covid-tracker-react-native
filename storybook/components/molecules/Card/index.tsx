import { grid } from '@tracer/branding/grid';
import Container from '@tracer/components/atoms/Container';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import CardActions, { ICardActionProps } from './actions';
import CardBody, { ICardBodyProps } from './body';
import CardFooter, { ICardFooterProps } from './footer';
import CardHeader, { ICardHeaderProps } from './header';
import CardImage, { ICardImageProps } from './image';

export interface ICardProps {
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  customBody?: ReactNode;
  headerProps?: ICardHeaderProps;
  footerProps?: ICardFooterProps;
  bodyProps?: ICardBodyProps;
  heroImage?: ICardImageProps;
  actions?: ICardActionProps;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
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
  heroImage,
  actions,
  onPress,
  style,
}: ICardProps) {
  return (
    <Container rounded onPress={onPress} style={[baseStyle.view, style]}>
      {heroImage ? <CardImage {...heroImage} /> : null}
      {!customHeader && headerProps ? <CardHeader {...headerProps} /> : null}
      {customHeader && !headerProps ? customHeader : null}
      {!customBody && bodyProps ? <CardBody {...bodyProps} /> : null}
      {customBody && !bodyProps ? customBody : null}
      {!customFooter && footerProps ? <CardFooter {...footerProps} /> : null}
      {customFooter && !footerProps ? customFooter : null}
      {actions ? <CardActions {...actions} /> : null}
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
