import { Icon } from '@covid/components';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';

export interface IIconButtonProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * IconButton
 *
 * @param style custom styling, overrides all other styles
 */
export default function IconButton({ style, ...props }: IIconButtonProps) {
  return (
    <Button style={[baseStyle.view, style]} testID={props.testID ?? 'IconButton-test-id'}>
      <Icon color="black" iconName="Lightbulb" />
    </Button>
  );
}

const baseStyle = StyleSheet.create({
  view: {
    backgroundColor: colors.white,
    margin: grid.g8,
  },
});
